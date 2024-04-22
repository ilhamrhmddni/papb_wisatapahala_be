const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rute untuk registrasi dan login pengguna
router.post('/authorization/register', authController.registerUser);
router.post('/authorization/login', authController.loginUser);

module.exports = router;
