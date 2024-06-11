const register = require("../../../schemas/admin/register.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    loginMessages
} = require("../../../utils/messages")


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
        const user = await register.findOne({userName});
        if(!user){
            throw new Error(loginMessages.userNotFound);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error(loginMessages.passwordNotMatch);
        }
        const secret = process.env.SECRETKEY;
        const userId = user._id;
        const token = jwt.sign({userId}, secret, {expiresIn: "1m"});
        res.status(200).json({message: loginMessages.userLoggedIn, token});
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg : err.message || "Internal Server Error"});
    }
}

module.exports = {login};