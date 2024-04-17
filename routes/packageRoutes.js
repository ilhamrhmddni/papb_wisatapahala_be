const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

router.get('/packages', packageController.getAllPackages);
router.get('/packages/:id', packageController.getPackageById);
router.post('/packages', packageController.createPackage);
router.put('/packages/update/:id', packageController.editPackage);
router.delete('/packages/:id', packageController.deletePackage);

module.exports = router;
