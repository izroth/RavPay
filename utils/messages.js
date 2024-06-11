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


module.exports= {
    loginMessages,
    registerMessages,
    globalMessages
}