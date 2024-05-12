import express from "express";
import * as itemController from "../controllers/itemController.js";

const router = express.Router();

router.route("/")
  // .get(itemController.getAllItems)
  .post(itemController.createItem);

router.route("/:id")
  // .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

export default router;
