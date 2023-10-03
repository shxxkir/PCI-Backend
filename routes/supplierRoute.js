const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.post('/supplier', supplierController.create);
router.get('/supplier', supplierController.findAll);
router.get('/supplier/:id', supplierController.findOne);
router.put('/supplier/:id', supplierController.update);
router.delete('/supplier/:id', supplierController.delete);

module.exports = router;
