const router = require('express').Router();

const userRoutes = require('./account');

router.use('/accountInfo', userRoutes);

module.exports = router;