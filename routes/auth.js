const express = require('express');
const router = express.Router();


const {
    registerBusiness
} = require('../controller/auth/register');


router.post('/register', registerBusiness);

module.exports = router;