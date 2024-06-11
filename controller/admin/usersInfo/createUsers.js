const userSchema = require("../../../schemas/user/user.schema");
const bcrypt = require("bcryptjs");
const { 
    createAccountNumber,
    createIFSCCODE
} = require("../../../utils/util.helper.service");
const { createUsersMessages, globalMessages } = require("../../../utils/messages");

const createUsers = async (req, res) => {
    try{
        const bankId = req.userId;
        if(!bankId){
            throw new Error(globalMessages.unauthorized);
        }
        const userName = req.body.userName;
        if(!userName){
            throw new Error(createUsersMessages.userNameRequired);
        }
        const password = req.body.password;
        if(!password){
            throw new Error(createUsersMessages.passwordRequired);
        }
        const confirmPassword = req.body.confirmPassword;
        if(password !== confirmPassword){
            throw new Error(createUsersMessages.passwordNotMatch);
        }
        const bankAccountNumber = await createAccountNumber();
        const IFSC = await createIFSCCODE();
        const user = await userSchema
            .findOne({userName});
        if(user){
            throw new Error(createUsersMessages.userNameExist);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userSchema({
            userName,
            password: hashedPassword,
            bankAccountNumber,
            IFSC,
            bankId
        });
        await newUser.save();
         res.status(201).json({msg: createUsersMessages.userCreated})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: err.message || "Internal Server Error"});
    }

}

module.exports = { createUsers };