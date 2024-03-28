import express from "express";
import { getRestaurantBusiestTime, getRestaurantMenuPopularity, 
    getRestaurantSaleInfo} from "../controllers/analytics.controller.js";
import { checkValidManager } from "../middleware/middleware.js";

const router = express.Router();

//Restaurant Analytics
router.get("/sales/:id", checkValidManager, getRestaurantSaleInfo);         //Get Sale info
router.get("/popular/:id", checkValidManager, getRestaurantMenuPopularity); //List popular menu items in order
router.get("/busy/:id",checkValidManager, getRestaurantBusiestTime);       //Returns a list of the times where most orders are picked up (hourly)

export default router;