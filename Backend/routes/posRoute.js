const express  = require('express');
const {newsalesController, getoneSale, deleteSale, updateSale, getallSale } = require('../controllers/salesController');

const router = express.Router();

router.post("/add", newsalesController);
router.get("/sale", getallSale);
router.get("/getpos/:tid", getoneSale);
router.get("/delpos/:objid", deleteSale);
router.post("/update", updateSale);

module.exports = router;