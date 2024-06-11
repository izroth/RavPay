const express = require('express');
const router = express.Router();


const {
    registerBusiness
} = require('../../controller/admin/auth/register');

const {
    login
} = require('../../controller/admin/auth/login');

router.post('/register', registerBusiness);
router.post('/login', login);

module.exports = router;