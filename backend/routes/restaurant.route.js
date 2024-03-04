import express from "express";
import { addRestaurant, getRestaurant, getRestaurants, updateRestaurant, deleteRestaurant, getRestaurantSaleInfo, getRestaurantMenuPopularity, getRestaurantBusiestTime} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post('/', addRestaurant);          //Add new restaurant
router.get("/", getRestaurants);          //List of Restaurants
router.get("/:_id", getRestaurant);       //Singular Restaurant
router.patch("/:_id", updateRestaurant);  //Update Restaurant Info
router.delete("/:_id", deleteRestaurant); //Delete Restaurant

//Restaurant Analytics
router.get("/analytics/sales/:_id", getRestaurantSaleInfo);         //Get Sale info
router.get("/analytics/popular/:_id", getRestaurantMenuPopularity); //List popular menu items in order
router.get("/analytics/busy/:_id", getRestaurantBusiestTime);       //Returns a list of the times where most orders are picked up (hourly)

export default router;