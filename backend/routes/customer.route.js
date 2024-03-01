import express from "express";
import { addCustomer, getCustomerByPhone} from "../controllers/customer.controller.js";

const router = express.Router();

router.post('/', addCustomer);
router.get("/:phone", getCustomerByPhone);

export default router;