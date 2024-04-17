// controllers/packageController.js

const Package = require('../models/package');

// Mendapatkan semua paket
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Membuat paket baru
exports.createPackage = async (req, res) => {
  const { nama, jenis, tanggal_kepulangan, tanggal_kepergian, harga, detail } = req.body;

  try {
    const newPackage = new Package({
        nama, 
        jenis, 
        tanggal_kepulangan, 
        tanggal_kepergian, 
        harga, 
        detail
    });

    await newPackage.save();
    res.json(newPackage);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Mengedit paket berdasarkan ID
exports.editPackage = async (req, res) => {
  const { nama, jenis, tanggal_kepulangan, tanggal_kepergian, harga, detail } = req.body;

  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { 
        nama, 
        jenis, 
        tanggal_kepulangan, 
        tanggal_kepergian, 
        harga, 
        detail 
      },
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Paket tidak ditemukan' });
    }

    res.json(updatedPackage);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({ message: 'Paket tidak ditemukan' });
    }

    res.json({ message: 'Paket berhasil dihapus' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


exports.getPackageById = async (req, res) => {
    try {
      const package = await Package.findById(req.params.id);
      if (!package) {
        return res.status(404).json({ message: 'Paket tidak ditemukan' });
      }
      res.json(package);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
};