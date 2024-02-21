const express  = require('express');
const {newsalesController, getoneSale, deleteSale, updateSale } = require('../controllers/salesController');

const router = express.Router();

router.post("/trans", newsalesController);
router.get("/getpos/:tid", getoneSale);
router.get("/delpos/:objid", deleteSale);
router.post("/update", updateSale);

module.exports = router;