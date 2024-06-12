const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    senderId:{
        type: String,
    },
    receiverId:{
        type: String,
    },
    receiverBankDetails:{
        type: Object,
    },
    senderBankDetails:{
        type: Object,
    },
    amount:{
        type: Number,
    },
    transactionType:{
        type: String,
    },
    description:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

const transaction = mongoose.model('transactions', transactionSchema);
module.exports = transaction;