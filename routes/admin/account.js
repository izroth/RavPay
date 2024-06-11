const express = require('express');
const router = express.Router();

const {
    createAccount,
} = require('../../controller/admin/accountInfo/createAccount');

const {
    getAccount,
} = require('../../controller/admin/accountInfo/getAccount');

const {
    updateAccount,
} = require('../../controller/admin/accountInfo/updateAccount');
router.post('/createAccount', createAccount);
router.get('/getAccount', getAccount);
router.put('/updateAccount/:id', updateAccount);

module.exports = router;