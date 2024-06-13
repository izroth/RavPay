const userSchema = require("../../../schemas/account/account.schema");
const bcrypt = require("bcryptjs");
const { 
    createAccountNumber,
} = require("../../../utils/util.helper.service");
const { createUsersMessages, globalMessages } = require("../../../utils/messages");

const createAccount = async (req, res) => {
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
       
        const user = await userSchema
            .findOne({userName, bankId});
        if(user){
            throw new Error(createUsersMessages.userNameExist);
        }
        const findBank = await userSchema.findOne({bankId});
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userSchema({
            userName,
            password: hashedPassword,
            bankAccountNumber,
            IFSC : findBank.IFSC,
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

module.exports = { createAccount };