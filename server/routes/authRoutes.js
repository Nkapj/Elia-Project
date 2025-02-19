const express = require('express');
const { register, login } = require('../controllers/authControllers'); 
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();



router.post('/register', authMiddleware, register);

router.post('/login', login);

module.exports = router;
