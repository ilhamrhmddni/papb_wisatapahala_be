// middleware/validateRegisterMiddleware.js

const { body, validationResult } = require('express-validator');

const validateRegister = [
  // Validasi input
  body('username').trim().isLength({ min: 3 }).withMessage('Username harus memiliki minimal 3 karakter'),
  body('email').trim().isEmail().withMessage('Email tidak valid'),
  body('password').trim().isLength({ min: 8 }).withMessage('Password harus memiliki minimal 8 karakter'),

  // Menangani kesalahan validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateRegister;
