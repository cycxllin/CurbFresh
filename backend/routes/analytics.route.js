import express from "express";
import { getRestaurantAnalytics} from "../controllers/analytics.controller.js";
import { checkValidManager } from "../middleware/middleware.js";

const router = express.Router();

//Restaurant Analytics for month given in req
router.get("/:id", checkValidManager, getRestaurantAnalytics);         //Get daily and total salesfor a month

export default router;