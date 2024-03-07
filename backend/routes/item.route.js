import express from "express";
import {addItem, deleteItem, getItemByName, updateItem, getItems } from "../controllers/item.controller.js";

const router = express.Router();

router.post('/', addItem);
router.get("/", getItems);
router.get("/:name", getItemByName);
router.patch("/:name", updateItem);
router.delete("/:name", deleteItem);

export default router;