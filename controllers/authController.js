const User = require('../models/user');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah pengguna sudah terdaftar
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({
      username,
      email,
      password: password 
    });

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

    // Verifikasi password - Perhatikan bahwa dalam kasus ini, password tidak di-hash
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
