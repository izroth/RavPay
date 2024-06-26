const userSchema = require("../../../schemas/account/account.schema");
const { getUsersMessages, globalMessages } = require("../../../utils/messages");

const getAccount = async (req,res) => {
    try{
        const userId = req.userId.toString();
        if(!userId){
            throw new Error(globalMessages.unauthorized);
        }
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const search = req.query.search;
        query = {};
        if(search){
            query = {userName: {$regex: search, $options: "i"}, bankId: userId};
        }
        else{
            query = {bankId: userId};
        }
        let users = await userSchema.find(query,{
            _id: 1,
            userName: 1,
            bankAccountNumber: 1,
            IFSC: 1,
            balance: 1,
            active: 1,
            createdAt: 1
        }).limit(limit).skip(startIndex);
        
        let message = getUsersMessages.usersNotFound;
        if(users.length > 0){
            message = getUsersMessages.usersFound;
        }
        

        const total = await userSchema.find({bankId: userId}).countDocuments();
        const pageData = {
            page,
            limit,
            total
        }
        res.status(200).json({users, pageData,msg: message,});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: err.message || "Internal Server Error"});
    }
}

module.exports = {getAccount};



