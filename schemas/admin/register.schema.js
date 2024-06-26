const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    userName: {
        type: String,   
    },
    password: {
        type: String,  
    },
    IFSC: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

});

const register = mongoose.model("admin", registerSchema);

module.exports = register;