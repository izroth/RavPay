const express = require('express');
const router = express.Router();

const {
    login,
} = require('../../controller/account/auth/login');


router.post('/login', login);

module.exports = router;