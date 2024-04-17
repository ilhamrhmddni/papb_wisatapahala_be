const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRegister = require('../middleware/validateRegister');

// Rute untuk registrasi dan login pengguna
router.post('/authorization/register', validateRegister, authController.registerUser);
router.post('/authorization/login', validateRegister, authController.loginUser);

module.exports = router;
