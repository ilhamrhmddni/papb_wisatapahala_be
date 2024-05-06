const mongoose = require('mongoose');

// Skema untuk koleksi 'users'
const savingSchema = new mongoose.Schema({
  waktu: Date,
  nominal: Number,
  id_user: (
    {type: mongoose.Schema.Types.ObjectId, ref : 'User'}
  )
});

// Membuat model 'User' berdasarkan skema 'userSchema'
const Saving = mongoose.model('Saving', savingSchema);

module.exports = Saving;
