const accountType = {
    CREDIT : 'CREDIT',
    DEBIT : 'DEBIT',
    BOTH : 'BOTH'
}
const transactionType = {
    DEBIT : 'DEBIT',
    CREDIT : 'CREDIT',
    WITHDRAWAL : 'WITHDRAWAL',
    DEPOSIT : 'DEPOSIT'
}

const transactionFilters = {
    ALL : 'ALL',
    DEBIT : 'DEBIT',
    CREDIT : 'CREDIT',
     WITHDRAWAL : 'WITHDRAWAL',
    DEPOSIT : 'DEPOSIT'
}
module.exports = {
    accountType,
    transactionType,
    transactionFilters
}