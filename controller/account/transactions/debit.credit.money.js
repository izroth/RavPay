const withdrawCreditSchema = require("../../../schemas/account/withdraw.credit.schema");

 const debitCreditMoney = async (req, res) => {
    try{
        const userId = req.userId;
        if(!userId){
            throw new Error(globalMessages.unauthorized);
        }


    }
    catch(err){
        
    }

 }

    module.exports = { withdrawCredit };