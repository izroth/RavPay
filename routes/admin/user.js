const express = require('express');
const router = express.Router();

const {
    createUsers,
} = require('../../controller/admin/usersInfo/createUsers');

router.post('/createUsers', createUsers);

module.exports = router;