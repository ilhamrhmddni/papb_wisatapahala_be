const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerAndLogin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah pengguna sudah terdaftar
    let user = await User.findOne({ email });

    if (user) {
      // Jika pengguna sudah terdaftar, lakukan login
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Kredensial tidak valid' });
      }

      // Buat dan kirim token JWT
      const payload = {
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      };

      jwt.sign(payload, 'ilhamrhmddni', { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } else {
      // Jika pengguna belum terdaftar, lakukan registrasi
      user = new User({
        username,
        email,
        password
      });

      // Mengenkripsi kata sandi
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Menyimpan pengguna ke database
      await user.save();

      // Buat dan kirim token JWT
      const payload = {
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      };

      jwt.sign(payload, 'ilhamrhmddni', { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { registerAndLogin };
