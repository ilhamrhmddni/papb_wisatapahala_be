const Saving = require('../models/saving');
const User = require('../models/user')

// Mendapatkan semua tabungan
exports.getAllSavings = async (req, res) => {

const id = req.params.id

  try {
    const savings = await Saving.find(id);
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
