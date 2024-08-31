import { Router } from "express";
import roomController from "../controllers/room-controller.js";
import auth from "../middlewares/auth.js";
import { body } from "express-validator";

const router = new Router();

router.get('', auth, roomController.getAll);
router.get('/:house_id', auth, roomController.getAllByHouseId);
router.get('/room/:id', auth, roomController.getById);
router.post('/create', 
    auth, 
    body('name').notEmpty().trim(), 
    body('house_id').isInt(),
    roomController.create
);
router.put('/update/:id', 
  auth,
  body('name').notEmpty().trim(), 
  roomController.update
);
router.delete('/delete/:id', auth, roomController.delete);

export default router;