const express = require("express");
const router = express.Router();

const { sendMoney } = require("../../controller/account/transactions/sendMoney");

router.post("/sendMoney", sendMoney);

module.exports = router;