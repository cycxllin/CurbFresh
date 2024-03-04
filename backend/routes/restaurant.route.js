import express from "express";
import { addRestaurant, getRestaurant, getRestaurants} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post('/', addRestaurant);   //Add new restaurant
router.get("/", getRestaurants);   //List of Restaurants
router.get("/:_id", getRestaurant);//Singular Restaurant

export default router;