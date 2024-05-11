const express  = require('express');
const {newsalesController, getSalesById, getoneSale, deleteSale,getallSale, upsale} = require('../controllers/salesController');

const router = express.Router();

router.post("/add", newsalesController);
router.get("/sale", getallSale);
router.get('/getsale/:id', getSalesById);
router.put('/update/:id', upsale);
router.get('/delpos/:ssid', deleteSale);

module.exports = router;