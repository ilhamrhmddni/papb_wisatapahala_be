const express = require('express');
const config = require('./config.js');
const cors = require('./cors')

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

const corsConfig = {
  origin: '',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))

app.use(express.json())
app.use(indexRoutes)

module.exports = app;