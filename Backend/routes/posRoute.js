import express from 'express';
import { newsalesController, getSalesById, getoneSale, deleteSale, getallSale, upsale } from '../controllers/salesController.js';

const router = express.Router();

router.post('/add', newsalesController);
router.get('/sale', getallSale);
router.get('/getsale/:id', getSalesById);
router.post('/updte/:id', upsale);
router.get('/delpos/:ssid', deleteSale);

export default router;
