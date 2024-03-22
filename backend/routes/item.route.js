import express from "express";
import {addItem, deleteItem, getItemById, updateItem, getItems, getItemsByList, getItemsByrestID} from "../controllers/item.controller.js";
import { checkValidManager } from "../middleware/middleware.js";

const router = express.Router();

router.post('/', checkValidManager, addItem);
router.get("/", getItems);
router.get("/list", getItemsByList);
router.get("/:id", getItemById);
// router.get("/:restID", getItemsByrestID);
router.patch("/:id", checkValidManager, updateItem);
router.delete("/:id", checkValidManager, deleteItem);

export default router;