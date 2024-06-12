const express = require("express");
const router = express.Router();

const { sendMoney } = require("../../controller/account/transactions/sendMoney");
const { checkBalance } = require("../../controller/account/transactions/checkBalance");

router.post("/sendMoney", sendMoney);
router.get("/checkBalance", checkBalance);

module.exports = router;