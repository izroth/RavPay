const globalMessages = {
    serverError: 'Server error',
    userNotFound: 'User not found',
    unauthorized: 'Unauthorized',
    inActive: 'Your account is inactive Please contact admin',
};
const registerMessages = {
    userNameExist: 'Username already exists',
    passwordNotMatch: 'Passwords do not match',
    userCreated : 'User created successfully',
    userNameRequired: 'Username is required',
    passwordRequired: 'Password is required',
}
const loginMessages = {
    userNameRequired: 'Username is required',
    passwordRequired: 'Password is required',
    userNotFound: 'User not found',
    passwordNotMatch: 'Password does not match',
    userLoggedIn: 'User logged in successfully',
}

const createUsersMessages = {
    userNameRequired: 'Username is required',
    passwordRequired: 'Password is required',
    userCreated: 'User created successfully',
    userNameExist: 'Username already exists',
    passwordNotMatch: 'Passwords do not match',
    bankAccountNumberRequired: 'Bank account number is required',
    IFSCRequired: 'IFSC is required',
    bankAccountNumberLength: 'Bank account number should be upto 10 digits',
    IFSCLength: 'IFSC should be upto 8 digits',
    
}

const getUsersMessages = {
    userNotFound: 'User not found',
    usersFound: 'Users found successfully'
}
const updateMessages = {
    accountTypeInvalid: 'Account type inlcude only DEBIT , CREDIT or BOTH',
    activeBoolean: 'Active should be boolean',
    userUpdated: 'User updated successfully',
    accountIdRequired: 'Account id is required',
    accountNotFound: 'Account not found',
    activeRequired: 'Active is required',
}
module.exports= {
    loginMessages,
    registerMessages,
    globalMessages,
    createUsersMessages,
    getUsersMessages,
    updateMessages
}