import { Router } from "express";
import deviceController from "../controllers/device-controller.js";
import auth from "../middlewares/auth.js";
import pagination from "../middlewares/pagination.js";
import { body } from "express-validator";

const router = new Router();

router.get('', auth, pagination, deviceController.getAll);
router.get('/unattached', auth, deviceController.getAllUnattached);
router.get('/:id', auth, deviceController.getById);
router.post('/create', 
    auth,
    body('name').notEmpty().trim(),
    body('type').notEmpty().trim(),
    deviceController.create
);
router.put('/update/:id', 
    auth,
    body('name').notEmpty().trim(),
    deviceController.update
);
router.delete('/delete/:id', auth, deviceController.delete);
router.put('/attach/:id', 
        auth, 
        body('house_id').isInt(),
        body('room_id').isInt(),
        body('room_name').trim(),
        deviceController.attachDevice
);
router.put('/detach/:id', auth, deviceController.detachDevice);
router.put('/updateInfo/:id', 
    auth,
    body('enabled').isBoolean(),
    body('active').isBoolean(),
    body('warning').isBoolean(),
    body('temperature').isInt(),
    deviceController.updateDeviceInfo
);
router.put('/filtred',
    auth,
    body('unattached').isBoolean(),
    body('enabled').isBoolean(),
    body('type').isString().trim(),
    deviceController.getFiltredDevices
);

export default router;