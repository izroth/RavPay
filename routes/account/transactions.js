const express = require("express");
const router = express.Router();

const { sendMoney } = require("../../controller/account/transactions/send.money");
const { checkBalance } = require("../../controller/account/transactions/check.balance");
const  {getBankToBankTransactions} = require("../../controller/account/transactions/get.bank.to.bank.transactions");
const { debitCreditMoney }  = require("../../controller/account/transactions/debit.credit.money");
const  { getCreditDebit } = require("../../controller/account/transactions/get.credit.debit"); 

router.post("/sendMoney", sendMoney);
router.get("/checkBalance", checkBalance);
router.get("/getBankToBankTransactions", getBankToBankTransactions);
router.post("/debitCreditMoney", debitCreditMoney);
router.get("/getCreditDebit", getCreditDebit);

module.exports = router;