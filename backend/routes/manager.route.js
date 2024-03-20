import express from "express";
import { addManager, deleteManager, getManagerByPhone, updateManager, 
    getManagers} from "../controllers/manager.controller.js";

const router = express.Router();

router.post('/', addManager);
router.get("/", getManagers);
router.get("/:phone", getManagerByPhone);
router.patch("/:phone", updateManager);
router.delete("/:phone", deleteManager);

export default router;