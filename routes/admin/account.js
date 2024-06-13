const express = require("express");
const router = express.Router();

const {
  createAccount,
} = require("../../controller/admin/accountInfo/create.account");

const {
  getAccount,
} = require("../../controller/admin/accountInfo/get.account");

const {
  updateAccount,
} = require("../../controller/admin/accountInfo/update.account");
router.post("/createAccount", createAccount);
router.get("/getAccount", getAccount);
router.put("/updateAccount/:id", updateAccount);

module.exports = router;
