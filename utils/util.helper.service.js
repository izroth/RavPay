const userSchema = require("../schemas/account/account.schema");
const jwt = require("jsonwebtoken");

const createToken = async (userId) => {
    const secret = process.env.SECRETKEY;
    const token = jwt.sign({ userId }, secret, { expiresIn: "30d" });
    return token;
}


const generateRandomNumber = (min, max) => {
    return Math.floor(min + Math.random() * (max - min));
};


const generateUniqueValue = async (min, max, field) => {
    let value;
    let existingValue;
    do {
        value = generateRandomNumber(min, max);
        const query = {};
        query[field] = value;
        existingValue = await userSchema.findOne(query);
    } while (existingValue);

    return value;
};

const createAccountNumber = async () => {
    return generateUniqueValue(1e9, 1e10, 'bankAccountNumber');
};

const createIFSCCODE = async () => {
    return generateUniqueValue(1e7, 1e8, 'IFSC');
};

module.exports = {
    createAccountNumber,
    createIFSCCODE,
    createToken
};
