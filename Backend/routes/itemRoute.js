import express from "express";
import * as itemController from "../controllers/itemController.js";
import authenticate from '../middleware/authenticate.js'

const router = express.Router();

router.use(authenticate);

router.post('/additem', itemController.createItem);
router.get('/allitem', itemController.getAllItems);
router.get('/getitem/:id', itemController.getItem);
router.put('/updteitem/:id', itemController.updateItem);
router.get('/deleteItem/:ssid', itemController.deleteItem);

export default router;
