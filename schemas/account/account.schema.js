const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type: String,
       
    },
    password:{
        type: String,
       
    },
    bankId:{
        type:String,
    },
    bankAccountNumber:{
        type:Number,
       
    },
    IFSC:{
        type:Number,
       
    },
    active:{
        type:Boolean,
        default:true
    
    },
    amount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
    
});

const user = mongoose.model('accounts', userSchema);

module.exports = user;
