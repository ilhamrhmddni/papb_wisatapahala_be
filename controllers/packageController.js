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
    const package = await Package.findById(req.params.id);

    if (!package) {
      return res.status(404).json({ message: 'Paket tidak ditemukan' });
    }

    package.nama = name;
    package.jenis = jenis;
    package.tanggal_kepulangan = tanggal_kepulangan;
    package.tanggal_kepergian = tanggal_kepergian;
    package.harga = price;
    package.detail = detail;

    await package.save();
    res.json(package);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Menghapus paket berdasarkan ID
exports.deletePackage = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);

    if (!package) {
      return res.status(404).json({ message: 'Paket tidak ditemukan' });
    }

    await package.remove();
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