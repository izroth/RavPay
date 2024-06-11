const express = require('express');
const router = express.Router();

const {
    createUsers,
} = require('../../controller/admin/usersInfo/createUsers');

const {
    getUsers,
} = require('../../controller/admin/usersInfo/getUsers');

router.post('/createUsers', createUsers);
router.get('/getUsers', getUsers);

module.exports = router;