const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const { } = require('../validation');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getUser);

module.exports = router;
