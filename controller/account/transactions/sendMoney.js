const transactionSchema = require("../../../schemas/account/transactions.schema");
const accountSchema = require("../../../schemas/account/account.schema");
const { globalMessages, sendMoneyMessages } = require("../../../utils/messages");
const { accountType } = require("../../../utils/enum");

const sendMoney = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new Error(globalMessages.unauthorized);
    }

    const senderAccount = await accountSchema.findById(userId);
    if (!senderAccount) {
      throw new Error(globalMessages.unauthorized);
    }

    if (senderAccount.accountType === accountType.CREDIT) {
      throw new Error(sendMoneyMessages.accountIsCredit);
    }

    const { bankAccountNumber, amount, IFSC, description } = req.body;

    if (!bankAccountNumber) {
      throw new Error(sendMoneyMessages.receiverAccountNumberRequired);
    }

    if (senderAccount.bankAccountNumber === bankAccountNumber) {
      throw new Error(sendMoneyMessages.cannotSendMoneyToSameAccount);
    }

    if (!amount) {
      throw new Error(sendMoneyMessages.amountRequired);
    }

    if (amount <= 0) {
      throw new Error(sendMoneyMessages.amountPositive);
    }

    if (amount > senderAccount.balance) {
      throw new Error(sendMoneyMessages.insufficientBalance);
    }

    if (!IFSC) {
      throw new Error(sendMoneyMessages.IFSCRequired);
    }

    const receiverAccount = await accountSchema.findOne({ bankAccountNumber, IFSC });
    if (!receiverAccount) {
      throw new Error(sendMoneyMessages.accountNotFound);
    }

    if (receiverAccount.accountType === accountType.DEBIT) {
      throw new Error(sendMoneyMessages.receiverAccountDebit);
    }

    await createTransaction(senderAccount, receiverAccount, amount, description);

    res.status(200).json({ msg: sendMoneyMessages.moneySent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message || "Internal Server Error" });
  }
};

const createTransaction = async (senderAccount, receiverAccount, amount, description) => {
  const session = await accountSchema.startSession();
  session.startTransaction();
  try {
    const senderBankDetails = {
      accountNumber: senderAccount.bankAccountNumber,
      IFSC: senderAccount.IFSC,
      accountType: senderAccount.accountType,
    };

    const receiverBankDetails = {
      accountNumber: receiverAccount.bankAccountNumber,
      IFSC: receiverAccount.IFSC,
      accountType: receiverAccount.accountType,
    };

    const newTransaction = new transactionSchema({
      senderId: senderAccount._id,
      receiverId: receiverAccount._id,
      amount,
      description,
      senderBankDetails,
      receiverBankDetails,
    });

    await newTransaction.save({ session });

    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    await senderAccount.save({ session });
    await receiverAccount.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

module.exports = { sendMoney };
