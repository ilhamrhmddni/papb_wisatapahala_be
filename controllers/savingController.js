const Saving = require('../models/saving');
const User = require('../models/user')

// Mendapatkan semua tabungan
exports.getAllSavings = async (req, res) => {
  const userId = req.params.userId; // Ganti menjadi userId untuk mengklarifikasi bahwa ini adalah ID pengguna, bukan ID tabungan

  try {
    // Periksa apakah pengguna ada
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cari tabungan yang dimiliki oleh pengguna tersebut
    const savings = await Saving.find({ id_user: userId });  

    // Periksa apakah ada tabungan untuk pengguna tersebut
    if (savings.length === 0) {
      return res.status(404).json({ message: "No savings found for this user" });
    }

    // Kirimkan tabungan yang ditemukan
    res.json(savings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


// Membuat tabungan baru
exports.createSaving = async (req, res) => {
    const id = req.params.id;
    const { nominal, waktu } = req.body;
  
    try {
      const newSaving = new Saving({
        nominal,
        waktu,
        id_user: id // Menggunakan id user yang saat ini masuk
      });
  
      await newSaving.save();
      res.json(newSaving);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };
  
  // Mengedit tabungan berdasarkan ID
  exports.editSaving = async (req, res) => {
    const { nominal, waktu } = req.body;
  
    try {
      let saving = await Saving.findById(req.params.id);
  
      if (!saving) {
        return res.status(404).json({ message: 'Tabungan tidak ditemukan' });
      }
  
      if (saving.id_user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Akses ditolak' });
      }
  
      saving.nominal = nominal;
      saving.waktu = waktu;
  
      await saving.save();
      res.json(saving);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };
  

// Menghapus tabungan berdasarkan ID
exports.deleteSaving = async (req, res) => {
  try {
    let saving = await Saving.findById(req.params.id);

    if (!saving) {
      return res.status(404).json({ message: 'Tabungan tidak ditemukan' });
    }

    if (saving.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Akses ditolak' });
    }

    await saving.remove();
    res.json({ message: 'Tabungan berhasil dihapus' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
