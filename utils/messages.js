const globalMessages = {
    serverError: 'Server error',
    userNotFound: 'User not found',
    unauthorized: 'Unauthorized',
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

module.exports= {
    loginMessages,
    registerMessages,
    globalMessages,
    createUsersMessages,
    getUsersMessages
}