const express  = require('express');
const {newtransactionController, getoneTransaction, deleteTransaction} = require('../controllers/postransactionController');

const router = express.Router();

router.post("/trans", newtransactionController);
router.get("/getpos/:tid", getoneTransaction);
router.get("/delpos/:objid", deleteTransaction);

module.exports = router;