const transactionsSchema = require("../../../schemas/account/transactions.schema");
const { globalMessages, transcationsMessages } = require("../../../utils/messages")
const accountSchema = require("../../../schemas/account/account.schema");
const bankDetailsSchema = require("../../../schemas/admin/register.schema")

const getBankToBankTransactions = async (req, res) => {
    try {
        const userId = req.userId.toString();
        if (!userId) {
            throw new Error(globalMessages.unauthorized);
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        let transactions = await transactionsSchema.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        }).sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit);

        transactions = await Promise.all(transactions.map(async transaction => {
            let transactionType = "CREDIT";
            let reciverInfo = {};
            let senderInfo = {};

            if (transaction.senderId === userId) {
                transactionType = "DEBIT";
                const receiverInfo = await accountSchema.findById(transaction.receiverId);
                const bankInfo  = await bankDetailsSchema.findById(receiverInfo.bankId);
                reciverInfo = {
                    userName: receiverInfo.userName,
                    bankAccountNumber: receiverInfo.bankAccountNumber,
                    IFSC: receiverInfo.IFSC,
                    bankName: bankInfo.userName,
                };
            } else if (transaction.receiverId === userId) {
                const senderInfo = await accountSchema.findById(transaction.senderId);
                const bankInfo  = await bankDetailsSchema.findById(senderInfo.bankId);
                senderInfo = {
                    userName: senderInfo.userName,
                    bankAccountNumber: senderInfo.bankAccountNumber,
                    IFSC: senderInfo.IFSC,
                    bankName: bankInfo.userName,
                };
            }

            return {
                senderId: transaction.senderId,
                receiverId: transaction.receiverId,
                amount: transaction.amount,
                description: transaction.description,
                transactionType: transactionType,
                createdAt: transaction.createdAt,
                reciverInfo,
                senderInfo
            };
        }));

        const total = await transactionsSchema.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        }).countDocuments();

        const pageData = {
            page,
            limit,
            total: total
        };

        res.status(200).json({ transactions, pageData, msg: transcationsMessages.transcationsFound });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message || "Internal Server Error" });
    }
}

module.exports = { getBankToBankTransactions };
