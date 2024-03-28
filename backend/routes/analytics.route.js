import express from "express";
import { getRestaurantBusiestTime, getRestaurantMenuPopularity, 
    getRestaurantSaleInfo} from "../controllers/analytics.controller.js";
import { checkValidManager } from "../middleware/middleware.js";

const router = express.Router();

//Restaurant Analytics only looks at completed orders
router.get("/sales/:id", checkValidManager, getRestaurantSaleInfo);         //Get Sale info
router.get("/popular/:id", checkValidManager, getRestaurantMenuPopularity); //List most popular menu items
router.get("/busy/:id",checkValidManager, getRestaurantBusiestTime);       //Returns a list of the hours where most orders are picked up

export default router;