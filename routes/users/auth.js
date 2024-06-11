const express = require('express');
const router = express.Router();

const {
    login,
} = require('../../controller/users/auth/login');


router.post('/login', login);

module.exports = router;