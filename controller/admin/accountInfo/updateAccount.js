const accountSchema = require("../../schemas/user/user.schema");
const {  } = require("../../utils/messages")

const updateAccount = async (req, res) => {
    try{
        const userId = req.userId;
        if(!userId){
            throw new Error(globalMessages.unauthorized);
        }
        const accountId = req.params.id;
        if(!accountId){
            throw new Error(getUsersMessages.accountIdRequired);
        }
        const account = await accountSchema.findById(accountId);
        if(!account){
            throw new Error(getUsersMessages.accountNotFound);
        }

        

    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: err.message || "Internal Server Error"});
    }

}

module.exports = { updateAccount };