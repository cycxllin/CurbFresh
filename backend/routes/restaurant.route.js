import express from "express";
import { addRestaurant, getRestaurant, getRestaurants, updateRestaurant,
    deleteRestaurant} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post('/', addRestaurant);            //Add new restaurant
router.get("/", getRestaurants);            //List of Restaurants
router.get("/:id", getRestaurant);          //Singular Restaurant
//router.get("/:id/menu", getRestaurantMenu); // use items route, get items by list
router.patch("/:id", updateRestaurant);     //Update Restaurant Info
router.delete("/:id", deleteRestaurant);    //Delete Restaurant

export default router;