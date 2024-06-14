const express = require("express");
const router = express.Router();

const { sendMoney } = require("../../controller/account/transactions/send.money");
const { checkBalance } = require("../../controller/account/transactions/check.balance");
const  {getBankToBankTransactions} = require("../../controller/account/transactions/get.bank.to.bank.transactions");


router.post("/sendMoney", sendMoney);
router.get("/checkBalance", checkBalance);
router.get("/getBankToBankTransactions", getBankToBankTransactions);


module.exports = router;