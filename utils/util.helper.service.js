const userSchema = require("../schemas/user/user.schema");

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
    createIFSCCODE
};
