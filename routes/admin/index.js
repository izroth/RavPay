const router = require('express').Router();

const userRoutes = require('./user');

router.use('/userInfo', userRoutes);

module.exports = router;