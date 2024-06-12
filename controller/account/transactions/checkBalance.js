const accountSchema = require("../../../schemas/account/account.schema");
const { globalMessages , checkBalanceMessages} = require("../../../utils/messages");


const checkBalance = async (req, res) => {
    try{
        const userId = req.userId;
        if(!userId){
            throw new Error(globalMessages.unauthorized);
        }
        const user = await accountSchema.findById(userId);

        const balance = user?.balance || 0;
        res.status(200).json({balance, msg:checkBalanceMessages.balanceFetch });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: err.message || "Internal Server Error"});
    }
}

module.exports = { checkBalance };