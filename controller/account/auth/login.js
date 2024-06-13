const accountSchema = require("../../../schemas/account/account.schema");
const bankDetailsSchema = require("../../../schemas/admin/register.schema");
const bcrypt = require("bcryptjs");
const {
    loginMessages,
    globalMessages
} = require("../../../utils/messages")
const {
    createToken
} = require("../../../utils/util.helper.service")


const login = async (req, res) => {
    try{
        const userName = req.body.userName;
        if(!userName){
            throw new Error(loginMessages.userNameRequired);
        
        }
        const password = req.body.password;
        if(!password){
            throw new Error(loginMessages.passwordRequired);
        } 
        const bankName = req.body.bankName;
        if(!bankName){
            throw new Error(loginMessages.bankNameRequired);
        }  
        const bank = await bankDetailsSchema.findOne({
            userName:bankName
        })
        if(!bank){
            throw new Error(loginMessages.bankNotFound);
        }
        const bankId = bank._id.toString();
        const user = await accountSchema.findOne({userName:userName, bankId:bankId});
        if(!user){
            throw new Error(loginMessages.userNotFound);
        }
        if(user.active === false){
            throw new Error(globalMessages.inActive);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error(loginMessages.passwordNotMatch);
        }
        const userId = user._id;
        const token = await createToken(userId);
        res.status(200).json({message: loginMessages.userLoggedIn, token});
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg : err.message || "Internal Server Error"});
    }
}

module.exports = {login};