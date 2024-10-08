import { Router } from "express";
import userController from "../controllers/user-controller.js";
import { body } from "express-validator";
import auth from "../middlewares/auth.js";

const router = new Router();

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 18}),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', auth, userController.getUsers);

export default router;