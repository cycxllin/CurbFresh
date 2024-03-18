import express from "express";
import {addItem, deleteItem, getItemById, updateItem, getItems, getItemsByList } from "../controllers/item.controller.js";

const router = express.Router();

router.post('/', addItem);
router.get("/", getItems);
router.get("/list", getItemsByList);
router.get("/:id", getItemById);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;