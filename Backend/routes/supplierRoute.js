const express  = require('express');

const {newsupplierController, getAllSuppliers, deleteSupplier, getoneSupplier, getSupplierById, updateSupplier } = require('../controllers/supplierController');

const router = express.Router();

router.post("/addsupplier", newsupplierController);
router.get('/suppliers', getAllSuppliers);
router.get('/delsup/:sid', deleteSupplier);
router.get('/getsup/:sid', getSupplierById);
router.put('/updt/:sid', updateSupplier);

module.exports = router;