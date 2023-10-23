import express from "express";
import {
  createUserController,
  loginController,
} from "../controllers/authController.js";
import { isAdmin, isAuthentication } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/admin/create", [isAuthentication, isAdmin], createUserController);
router.post("/login", loginController);

export default router;
