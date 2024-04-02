const express = require('express');
const route = express.Router()
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const packageRoutes = require('./packageRoutes');
const savingRoutes = require('./savingRoutes');

route.get('/', (req, res) => {
    res.json({
        messsage: "selamat datang di server"
    })
})

route.use(userRoutes, authRoutes, packageRoutes, savingRoutes)

module.exports = route;