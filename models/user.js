const mongoose = require('mongoose');

// Skema untuk koleksi 'users'
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  is_admin: Boolean,
  id_package: (
    {type: mongoose.Schema.Types.ObjectId, ref: 'Package', require: false}
),
});

// Membuat model 'User' berdasarkan skema 'userSchema'
const User = mongoose.model('User', userSchema);

module.exports = User;
