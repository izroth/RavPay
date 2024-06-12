const { globalMessages, debitCreditMessages, transactionType, accountType } = require("../../../utils/messages");
const accountSchema = require("../../../schemas/account/account.schema");
const withdrawCreditSchema = require("../../../schemas/account/withdraw.credit.schema");

const debitCreditMoney = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ msg: globalMessages.unauthorized });
        }

        const findUser = await accountSchema.findById(userId);
        const action = req.body.action;
        const amount = req.body.amount;
        const description = req.body.description;

        if (![transactionType.CREDIT, transactionType.DEBIT].includes(action)) {
            return res.status(400).json({ msg: globalMessages.invalidAction });
        }

        if (!amount) {
            return res.status(400).json({ msg: debitCreditMessages.amountRequired });
        }
        if (amount <= 0) {
            return res.status(400).json({ msg: debitCreditMessages.amountPositive });
        }

        if (action === transactionType.CREDIT) {
            if (findUser.accountType === accountType.DEBIT) {
                return res.status(400).json({ msg: debitCreditMessages.accountOnlyDebit });
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
                return res.status(400).json({ msg: debitCreditMessages.accountOnlyCredit });
            } else {
                if (findUser.balance < amount) {
                    return res.status(400).json({ msg: debitCreditMessages.insufficientBalance });
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
