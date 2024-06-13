const deibtCreditSchemas = require("../../../schemas/account/debit.credit.schema");
const { globalMessages, getCreaditDebitMessages } = require("../../../utils/messages");


const getCreditDebit = async (req, res) => {
    try{
        const userId = req.userId;
        if(!userId){
            throw new Error(globalMessages.unauthorized);
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        let transactions = await deibtCreditSchemas.find({userId}).sort({createdAt: -1})
        .limit(limit)
        .skip((page - 1) * limit);
        
        transactions = await Promise.all(transactions.map(async transaction => {
            return {
                amount: transaction.amount,
                description: transaction.description,
                transactionType: transaction.transactionType,
                createdAt: transaction.createdAt,
                // balance: accountInfo.balance
            };
        }));

        const total = await deibtCreditSchemas.find({userId}).countDocuments();

        const pageData = {
            page,
            limit,
            total
        }

        res.status(200).json({transactions, pageData, msg: getCreaditDebitMessages.creditDebitFound});


        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: err.message || "Internal Server Error"});
    }


}

module.exports = { getCreditDebit };