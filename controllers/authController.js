const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah pengguna sudah terdaftar
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Membuat hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Membuat pengguna baru
    user = new User({
      username,
      email,
      password: hashedPassword
    });

    // Menyimpan pengguna ke database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Memverifikasi password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Membuat dan mengirim token JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        id_package: user.id_package
      }
    };

    jwt.sign(payload, 'ilhamrhmddni', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, id: user.id });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

