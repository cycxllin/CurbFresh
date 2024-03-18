import express from "express";
import {createOrder, deleteOrder, getOrderById, updateOrder, getOrdersFromRestaurantID, 
    getOrders, getOrdersFromCustomerID } from "../controllers/order.controller.js";
import { checkValidCustomer, checkValidUser, checkValidItems } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", getOrders);

// Only customers can create orders 
router.post('/', checkValidCustomer, checkValidItems, createOrder);
router.get("/restaurant/:id", getOrdersFromRestaurantID); 
router.get("/customer/:id", getOrdersFromCustomerID); 
router.get("/:id", getOrderById);
router.patch("/:id", checkValidUser, checkValidItems, updateOrder);  // Updates an order
//router.patch("/:orderID/:itemID", addItemToOrder);  // use update order

//changes active to false
router.delete("/:id", deleteOrder);

export default router;