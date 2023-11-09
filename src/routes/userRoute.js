import express from "express";
import {
  deleteUserController,
  getAllUserController,
  getCurrentUserController,
  getUserByIdController,
  updateProfile,
  updateUser,
} from "../controllers/userController.js";
import { isAdmin, isAuthentication } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/get-all", [isAuthentication, isAdmin], getAllUserController);
router.get("/get-user/:id", [isAuthentication, isAdmin], getUserByIdController);
router.get("/get-current-user", [isAuthentication], getCurrentUserController);
router.put("/update-user/:id", [isAuthentication, isAdmin], updateUser);
router.delete(
  "/delete-user/:id",
  [isAuthentication, isAdmin],
  deleteUserController
);
router.put("/update-profile", [isAuthentication], updateProfile);

export default router;
