import express from "express";
import { addRestaurant, getRestaurant, getRestaurants, updateRestaurant, deleteRestaurant} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post('/', addRestaurant);          //Add new restaurant
router.get("/", getRestaurants);          //List of Restaurants
router.get("/:_id", getRestaurant);       //Singular Restaurant
router.patch("/:_id", updateRestaurant);    //Update Restaurant Info
router.delete("/:_id", deleteRestaurant); //Delete Restaurant

export default router;