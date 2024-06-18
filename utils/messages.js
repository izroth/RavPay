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
    bankNotFound: 'Bank not found',
    userNameRequired: 'Username is required',
    passwordRequired: 'Password is required',
    userNotFound: 'User not found',
    passwordNotMatch: 'Password does not match',
    userLoggedIn: 'User logged in successfully',
    bankNameRequired: 'Bank name is required',
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
    usersNotFound: 'Users not found',
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
    transactionTypeRequired: "Transaction type is required",
    invalidTransactionType: "Invalid transaction type",
    accountIsCredit: "Sender account is credit type",
    receiverAccountNumberRequired: "Receiver account number is required",
    insufficientWithdrawalLimit: "Insufficient withdrawal limit",
    cannotSendMoneyToSameAccount: "Cannot send money to the same account",
    amountRequired: "Amount is required",
    amountPositive: "Amount must be positive",
    insufficientBalance: "Insufficient balance",
    IFSCRequired: "IFSC code is required",
    accountNotFound: "Receiver account not found",
    receiverAccountDebit: "Receiver account is debit type",
    moneySent: "Money sent successfully",
    moneyWithdrawn: "Money withdrawn successfully",
    moneyDeposited: "Money deposited successfully"
};

const checkBalanceMessages = {
    balanceFetch: 'Balance fetched successfully'
}


const transcationsMessages = {
    transactionsFound: 'Transactions found successfully',
    transactionsNotFound: 'Transactions not found',
    invalidFilter: 'Invalid filter',
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
    dailyLimitExceeded: 'Daily withdrawal limit exceeded',
    
};

const getCreaditDebitMessages = {
    creditDebitFound: 'Credit and Debit found successfully',
    creditDebitNotFound: 'Credit and Debit not found',
    creditDebitIdRequired: 'Credit and Debit id is required',
    creditDebitDeleted: 'Credit and Debit deleted successfully',
    creditDebitUpdated: 'Credit and Debit updated successfully',
}

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
    debitCreditMessages,
    getCreaditDebitMessages
}