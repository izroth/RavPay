const transactionSchema = require("../../../schemas/account/transactions.schema");
const accountSchema = require("../../../schemas/account/account.schema");
const { globalMessages, sendMoneyMessages } = require("../../../utils/messages");
const { accountType } = require("../../../utils/enum");
const  { transactionType : transactionValue } = require("../../../utils/enum");

const sendMoney = async (req, res) => {
  try {
      const userId = req.userId;
      if (!userId) {
          throw new Error(sendMoneyMessages.unauthorized);
      }

      const account = await accountSchema.findById(userId);
      if (!account) {
          throw new Error(sendMoneyMessages.unauthorized);
      }

      const { bankAccountNumber, amount, IFSC, description, transactionType } = req.body;

      if (!transactionType) {
          throw new Error(sendMoneyMessages.transactionTypeRequired);
      }

      if (transactionType === transactionValue.DEBIT) {
          if (account.accountType === 'CREDIT') {
              throw new Error(sendMoneyMessages.accountIsCredit);
          }

          if (!bankAccountNumber) {
              throw new Error(sendMoneyMessages.receiverAccountNumberRequired);
          }
          if (amount > account.remaingWithdrawalLimit) {
              throw new Error(sendMoneyMessages.insufficientWithdrawalLimit);
          }
          if (account.bankAccountNumber === bankAccountNumber) {
              throw new Error(sendMoneyMessages.cannotSendMoneyToSameAccount);
          }
          if (!amount) {
              throw new Error(sendMoneyMessages.amountRequired);
          }
          if (amount <= 0) {
              throw new Error(sendMoneyMessages.amountPositive);
          }
          if (amount > account.balance) {
              throw new Error(sendMoneyMessages.insufficientBalance);
          }
          if (!IFSC) {
              throw new Error(sendMoneyMessages.IFSCRequired);
          }

          const receiverAccount = await accountSchema.findOne({ bankAccountNumber, IFSC });
          if (!receiverAccount) {
              throw new Error(sendMoneyMessages.accountNotFound);
          }
          if (receiverAccount.accountType === 'DEBIT') {
              throw new Error(sendMoneyMessages.receiverAccountDebit);
          }

          await createTransaction(account, receiverAccount, amount, description, transactionValue.DEBIT);

          res.status(200).json({ msg: sendMoneyMessages.moneySent });

      } else if (transactionType === transactionValue.WITHDRAWAL) {
          if (!amount) {
              throw new Error(sendMoneyMessages.amountRequired);
          }
          if (amount <= 0) {
              throw new Error(sendMoneyMessages.amountPositive);
          }
          if (amount > account.balance) {
              throw new Error(sendMoneyMessages.insufficientBalance);
          }
          if (amount > account.remaingWithdrawalLimit) {
              throw new Error(sendMoneyMessages.insufficientWithdrawalLimit);
          }

          await createTransaction(account, account, amount, description, transactionValue.WITHDRAWAL);

          res.status(200).json({ msg: sendMoneyMessages.moneyWithdrawn });

      } else if (transactionType === transactionValue.DEPOSIT) {
          if (!amount) {
              throw new Error(sendMoneyMessages.amountRequired);
          }
          if (amount <= 0) {
              throw new Error(sendMoneyMessages.amountPositive);
          }

          await createTransaction(account, account, amount, description, transactionValue.DEPOSIT);

          res.status(200).json({ msg: sendMoneyMessages.moneyDeposited });

      } else {
          throw new Error(sendMoneyMessages.invalidTransactionType);
      }
  } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.message || "Internal Server Error" });
  }
};

const createTransaction = async (senderAccount, receiverAccount, amount, description, transactionType) => {
  const session = await accountSchema.startSession();
  session.startTransaction();
  try {
      const senderBankDetails = {
          accountNumber: senderAccount.bankAccountNumber,
          IFSC: senderAccount.IFSC,
          accountType: senderAccount.accountType,
      };

      const receiverBankDetails = receiverAccount ? {
          accountNumber: receiverAccount.bankAccountNumber,
          IFSC: receiverAccount.IFSC,
          accountType: receiverAccount.accountType,
      } : null;

      const newTransaction = new transactionSchema({
          senderId: senderAccount._id,
          receiverId: receiverAccount ? receiverAccount._id : null,
          amount,
          description,
          senderBankDetails,
          receiverBankDetails,
          transactionType,
      });

      await newTransaction.save({ session });

      if (transactionType === transactionValue.DEBIT) {
          senderAccount.balance -= amount;
          receiverAccount.balance += amount;
          senderAccount.remaingWithdrawalLimit -= amount;
          await receiverAccount.save({ session });
      } else if (transactionType === transactionValue.WITHDRAWAL) {
          senderAccount.balance -= amount;
          senderAccount.remaingWithdrawalLimit -= amount;
      } else if (transactionType === transactionValue.DEPOSIT) {
          senderAccount.balance += amount;
      }

      await senderAccount.save({ session });
      await session.commitTransaction();
      session.endSession();
  } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
  }
};

module.exports = {
  sendMoney
};
