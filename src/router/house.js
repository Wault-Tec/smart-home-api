import { Router } from "express";
import houseController from "../controllers/house-controller.js";
import auth from "../middlewares/auth.js";
import { body } from "express-validator";

const router = new Router();

router.get('', auth, houseController.getAll);
router.get('/:id', auth, houseController.getById);
router.post('/create', 
    auth, 
    body('name').notEmpty().trim(), 
    houseController.create
);
router.put('/update/:id', 
  auth,
  body('name').notEmpty().trim(), 
  houseController.update
);
router.delete('/delete/:id', auth, houseController.delete);

export default router;