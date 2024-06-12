const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const withdrawCreditSchema = new Schema({
    userId: {
        type: String,
    },
    amount: {
        type: Number,
    },
    description: {
        type: String,
    },
    transactionType:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    });

const withdrawCredit = mongoose.model("withdrawCredit", withdrawCreditSchema);
module.exports = withdrawCredit;