const express = require('express');
const authController = require('./controllers/authController');
const router = express.Router();
const authMiddleware = require('./middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', authMiddleware, authController.user);

module.exports = router;