const express = require("express");
const router = express.Router();

const { sendMoney } = require("../../controller/account/transactions/send.money");
const { checkBalance } = require("../../controller/account/transactions/check.balance");

router.post("/sendMoney", sendMoney);
router.get("/checkBalance", checkBalance);

module.exports = router;