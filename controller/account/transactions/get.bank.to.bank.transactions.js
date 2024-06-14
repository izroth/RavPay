const transactionsSchema = require("../../../schemas/account/transactions.schema");
const { globalMessages, transcationsMessages } = require("../../../utils/messages");
const accountSchema = require("../../../schemas/account/account.schema");
const bankDetailsSchema = require("../../../schemas/admin/register.schema");

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
            let receiverInfo = {};
            let senderInfo = {};

            if (transaction.senderId === userId && transaction.receiverId !== userId) {
                transactionType = "DEBIT";
               
            }
            if(transaction.senderId === userId && transaction.receiverId === userId){
                transactionType = transaction.transactionType;
            }

            const receiverAccountInfo = await accountSchema.findById(transaction.receiverId);
            const receiverBankInfo = await bankDetailsSchema.findById(receiverAccountInfo.bankId);
            receiverInfo = {
                userName: receiverAccountInfo.userName,
                bankAccountNumber: receiverAccountInfo.bankAccountNumber,
                IFSC: receiverAccountInfo.IFSC,
                bankName: receiverBankInfo.userName,
            };
            const senderAccountInfo = await accountSchema.findById(transaction.senderId);
            const senderBankInfo = await bankDetailsSchema.findById(senderAccountInfo.bankId);
            senderInfo = {
                userName: senderAccountInfo.userName,
                bankAccountNumber: senderAccountInfo.bankAccountNumber,
                IFSC: senderAccountInfo.IFSC,
                bankName: senderBankInfo.userName,
            };

            return {
                senderId: transaction.senderId,
                receiverId: transaction.receiverId,
                amount: transaction.amount,
                description: transaction.description,
                transactionType: transactionType,
                createdAt: transaction.createdAt,
                receiverInfo,
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

        res.status(200).json({ transactions, pageData, msg: transcationsMessages.transactionsFound });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message || "Internal Server Error" });
    }
}

module.exports = { getBankToBankTransactions };
