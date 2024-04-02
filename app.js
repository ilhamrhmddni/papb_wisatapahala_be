const express = require('express');
const config = require('./config').default;

const indexRoutes = require('./routes/index.js')

const app = express();

// Panggil fungsi untuk koneksi ke MongoDB dari config.js
config().then(() => {
  // Lakukan apa pun yang perlu dilakukan setelah koneksi berhasil
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
});

app.use(express.json())
app.use(indexRoutes)

module.exports = app;