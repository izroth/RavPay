const { globalMessages, debitCreditMessages,  } = require("../../../utils/messages");
const accountSchema = require("../../../schemas/account/account.schema");
const withdrawCreditSchema = require("../../../schemas/account/withdraw.credit.schema");
const  { transactionType, accountType } = require("../../../utils/enum");

const debitCreditMoney = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            throw new Error(globalMessages.unauthorized);
        }

        const findUser = await accountSchema.findById(userId);
        const action = req.body.action;
        const amount = req.body.amount;
        const description = req.body.description;

        if (![transactionType.CREDIT, transactionType.DEBIT].includes(action)) {
            throw new Error(debitCreditMessages.accountTypeInvalid);
        }

        if (!amount) {
            throw new Error(debitCreditMessages.amountRequired);
        }
        if (amount <= 0) {
            throw new Error(debitCreditMessages.amountPositive);
        }

        if (action === transactionType.CREDIT) {
            if (findUser.accountType === accountType.DEBIT) {
                throw new Error(debitCreditMessages.accountOnlyDebit);
            } else {
                const newCredit = new withdrawCreditSchema({
                    userId,
                    amount,
                    description,
                    transactionType: transactionType.CREDIT
                });
                await newCredit.save();
                findUser.balance += amount;
                await findUser.save();
                return res.status(200).json({ msg: debitCreditMessages.creditSuccess });
            }
        } else if (action === transactionType.DEBIT) {
            if (findUser.accountType === accountType.CREDIT) {
                throw new Error(debitCreditMessages.accountOnlyCredit);
            } else {
                if (findUser.balance < amount) {
                    throw new Error(debitCreditMessages.insufficientBalance);
                }
                const newDebit = new withdrawCreditSchema({
                    userId,
                    amount,
                    description,
                    transactionType: transactionType.DEBIT
                });
                await newDebit.save();
                findUser.balance -= amount;
                await findUser.save();
                return res.status(200).json({ msg: debitCreditMessages.debitSuccess });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message || "Internal Server Error" });
    }
}

module.exports = { debitCreditMoney };
