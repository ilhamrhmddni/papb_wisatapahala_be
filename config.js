const mongoose = require('mongoose');

// Konfigurasi koneksi MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ilhamrhmddni:badariah123@ilhamrhmddni.fqznp3q.mongodb.net/');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;
