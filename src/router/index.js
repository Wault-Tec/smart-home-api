import { Router } from "express";
import auth from "./auth.js";
import house from "./house.js";
import room from "./room.js";
import device from "./device.js";

const router = new Router();

router.use('/auth', auth);
router.use('/house', house);
router.use('/rooms', room);
router.use('/device', device);

export default router;