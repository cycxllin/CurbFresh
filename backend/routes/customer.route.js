import express from "express";
import { addCustomer, deleteCustomer, getCustomerByPhone, updateCustomer, 
    getCustomers} from "../controllers/customer.controller.js";

const router = express.Router();

router.post('/', addCustomer);
router.get("/", getCustomers);
router.get("/:phone", getCustomerByPhone);
router.patch("/:phone", updateCustomer);
router.delete("/:phone", deleteCustomer);

export default router;