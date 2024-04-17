const mongoose = require('mongoose');

// Skema untuk koleksi 'users'
const packageSchema = new mongoose.Schema({
  nama: String,
  jenis: String,
  tanggal_kepulangan: Date,
  tanggal_kepergian: Date,
  harga: Number,
  detail: String 
});

// Membuat model 'User' berdasarkan skema 'userSchema'
const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
