import express from 'express';
import { newsupplierController, getAllSuppliers, deleteSupplier, getoneSupplier, getSupplierById, updateSupplier } from '../controllers/supplierController.js';

const router = express.Router();

router.post('/addsupplier', newsupplierController);
router.get('/suppliers', getAllSuppliers);
router.get('/delsup/:sid', deleteSupplier);
router.get('/getsup/:sid', getSupplierById);
router.put('/updt/:sid', updateSupplier);

export default router;
