const express = require('express');
const router = express.Router();
const savingController = require('../controllers/savingController');

router.get('/savings/users/:id', savingController.getAllSavings);
router.post('/savings/users/:id', savingController.createSaving);
router.put('/savings/:id', savingController.editSaving);
router.delete('/savings/:id', savingController.deleteSaving);

module.exports = router;
