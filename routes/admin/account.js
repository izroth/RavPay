const express = require('express');
const router = express.Router();

const {
    createAccount,
} = require('../../controller/admin/accountInfo/createAccount');

const {
    getAccount,
} = require('../../controller/admin/accountInfo/getAccount');

router.post('/createAccount', createAccount);
router.get('/getAccount', getAccount);

module.exports = router;