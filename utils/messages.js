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
    dailyWithdrawalLimitNumber: 'Daily withdrawal limit should be a number',
    noUpdatesProvided: 'No updates provided',
    accountTypeInvalid: 'Account type inlcude only DEBIT , CREDIT or BOTH',
    activeBoolean: 'Active should be boolean',
    userUpdated: 'User updated successfully',
    accountIdRequired: 'Account id is required',
    accountNotFound: 'Account not found',
    activeRequired: 'Active is required',
    accountUpdated: 'Account updated successfully',
}

const sendMoneyMessages = {
    amountRequired:'Amount is required',
    receiverAccountNumberRequired:'Receiver Account Number is required',
    receiverIFSCRequired:'Receiver IFSC is required',
    moneySent:'Money sent successfully',
    insufficientBalance:'Insufficient balance',
    accountNotFound:'Account not found',
    reciverInactive: 'Receiver account is inactive',
    cannotSendMoneyToSameAccount: 'Cannot send money to same account',
    amountPositive: 'Amount should greater than 0',
    accountNumberLength: 'Account number should be upto 10 digits',
    IFSClength: 'IFSC should be upto 8 digits',
    accountIsDebit: 'Account is only debit type',
    accountIsCredit: 'Account is only credit type',
    receiverAccountDebit: 'Receiver account is debit type',
    receiverAccountCredit: 'Receiver account is credit type',

}

const checkBalanceMessages = {
    balanceFetch: 'Balance fetched successfully'
}


const transcationsMessages = {
    transcationsFound: 'Transcations found successfully',
    transcationNotFound: 'Transcation not found',
    transcationIdRequired: 'Transcation id is required',
    transcationDeleted: 'Transcation deleted successfully',
    transcationUpdated: 'Transcation updated successfully',
}

const debitCreditMessages = {
    accountTypeInvalid: 'Account type includes only DEBIT and CREDIT',
    activeBoolean: 'Active should be a boolean',
    amountRequired: 'Amount is required',
    amountPositive: 'Amount must be a positive value',
    accountOnlyDebit: 'Account is only debit type',
    accountOnlyCredit: 'Account is only credit type',
    insufficientBalance: 'Insufficient balance',
    creditSuccess: 'Amount credited successfully',
    debitSuccess: 'Amount debited successfully',
    
};

module.exports= {
    loginMessages,
    registerMessages,
    globalMessages,
    createUsersMessages,
    getUsersMessages,
    updateMessages,
    sendMoneyMessages,
    checkBalanceMessages,
    transcationsMessages,
    debitCreditMessages
}