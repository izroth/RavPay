const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    userName: {
        type: String,   
    },
    password: {
        type: String,  
    },

});

const register = mongoose.model("Register", registerSchema);

module.exports = register;