const express = require('express');
const { register, login } = require('../controllers/autControllers'); 
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();



router.post('/register', authMiddleware, register);
router.post('/login', login);

module.exports = router;
