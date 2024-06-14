const transactionSchema = require("../../../schemas/account/transactions.schema");
const { globalMessages, transcationsMessages } = require("../../../utils/messages");
const accountSchema = require("../../../schemas/account/account.schema");
const bankDetailsSchema = require("../../../schemas/admin/register.schema");
const { transactionType , transactionFilters} = require("../../../utils/enum");


const getBankToBankTransactions = async (req, res) => {
    try {
        const userId = req.userId.toString();
        if (!userId) {
            throw new Error(globalMessages.unauthorized);
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filter = req.query.filter || transactionFilters.ALL;
        
        if(!Object.values(transactionFilters).includes(filter)){
            throw new Error(transcationsMessages.invalidFilter);
        }

        let filterCriteria = {
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        };

        if (filter === transactionFilters.DEBIT) {
            filterCriteria.transactionType = transactionFilters.DEBIT;
            filterCriteria.senderId = userId;
        } else if (filter === transactionFilters.CREDIT) {
            filterCriteria.transactionType = transactionFilters.CREDIT;
            filterCriteria.receiverId = userId;
        } else if (filter === transactionFilters.WITHDRAWAL) {
            filterCriteria.transactionType = transactionFilters.WITHDRAWAL;
        } else if (filter === transactionFilters.DEPOSIT) {
            filterCriteria.transactionType = transactionFilters.DEPOSIT;
        }

        let transactions = await transactionSchema.find(filterCriteria)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit);

        transactions = await Promise.all(transactions.map(async transaction => {
            let transactionType = transaction.transactionType;
            let receiverInfo = {};
            let senderInfo = {};

            if (transaction.senderId === userId && transaction.transactionType === transactionFilters.DEBIT) {
                transactionType = transactionFilters.DEBIT;
            } else if (transaction.receiverId === userId && transaction.transactionType === transactionFilters.CREDIT) {
                transactionType = transactionFilters.CREDIT;
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

        const total = await transactionSchema.find(filterCriteria).countDocuments();

        const pageData = {
            page,
            limit,
            total
        };

        res.status(200).json({ transactions, pageData, msg: "Transactions found" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message || "Internal Server Error" });
    }
}

module.exports = { getBankToBankTransactions };
