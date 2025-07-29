const express = require('express');
const router = express.Router();
const {fetchMessages, postMessage} = require("../controllers/messageContoller");
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/:room', fetchMessages);

router.post('/', verifyToken, postMessage);

module.exports = router;
