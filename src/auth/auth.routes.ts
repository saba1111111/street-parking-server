import express from "express";
import { container } from "../container";
import { AuthController } from "./auth.controller";
import { validateLogin, validateRegister } from "../../libs/auth/validations";

const router = express.Router();
const authController = container.get(AuthController);

router.post(
  "/register",
  validateRegister,
  authController.register.bind(authController)
);

router.post("/login", validateLogin, authController.login.bind(authController));

export default router;
