const userSchema = require("../../../schemas/account/account.schema");
const { getUsersMessages, globalMessages } = require("../../../utils/messages");

const getAccount = async (req,res) => {
    try{
        const userId = req.userId;
        if(!userId){
            throw new Error(globalMessages.unauthorized);
        }
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        let users = await userSchema.find({bankId: userId},{
            _id: 1,
            userName: 1,
            bankAccountNumber: 1,
            IFSC: 1,
            active: 1,
            createdAt: 1
        }).limit(limit).skip(startIndex);
        

        const total = await userSchema.find({bankId: userId}).countDocuments();
        const pageData = {
            page,
            limit,
            total
        }
        res.status(200).json({users, pageData,msg: getUsersMessages.usersFound,});
        


    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: err.message || "Internal Server Error"});
    }
}

module.exports = {getAccount};



