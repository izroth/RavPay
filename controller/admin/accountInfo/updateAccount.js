const userSchema = require("../../schemas/user/user.schema");

const updateAccount = async (req, res) => {
    try{
        const userId = req.userId;
        if(!userId){
            throw new Error(globalMessages.unauthorized);
        }
        

    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: err.message || "Internal Server Error"});
    }

}

module.exports = { updateAccount };