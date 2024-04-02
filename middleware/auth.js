// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Mengambil token dari header
  const token = req.header('Authorization');

  // Memeriksa apakah token ada
  if (!token) {
    return res.status(401).json({ message: 'Missing token, authorization denied' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, 'ilhamrhmddni'); // Ganti 'secret_key' dengan kunci rahasia Anda

    // Menyimpan ID pengguna yang terverifikasi di objek request untuk digunakan di rute lain
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

module.exports = authenticateUser;
