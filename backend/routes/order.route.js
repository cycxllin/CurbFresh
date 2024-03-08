import express from "express";
import {createOrder, deleteOrder, getOrderById, updateOrderStatus, getOrdersFromRestaurantID, getOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post('/', createOrder);                            // Create a new order 
router.get("/", getOrders);                               // Get a list of ALL orders
router.get("/:id", getOrderById);                         //Get a single order by its ID
router.get("/restaurant/:id", getOrdersFromRestaurantID); //Get a list of all orders from a restaurant
router.patch("/:id", updateOrderStatus);                  //Updates an order status
router.delete("/:id", deleteOrder);                       //Deletes an order (When a user cancels?)

export default router;