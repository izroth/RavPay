const register = require("../../../schemas/account/account.schema");
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
        const user = await register.findOne({userName:userName});
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