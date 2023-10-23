import express from "express";
import {
  deleteUserController,
  getAllUserController,
  getCurrentUserController,
  getUserByIdController,
  updateUser,
} from "../controllers/userController.js";
import {
  isAdmin,
  isAuthentication,
  isTeacher,
} from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/admin/get-all", [isAuthentication, isAdmin], getAllUserController);
router.get(
  "/admin/get-user/:id",
  [isAuthentication, isAdmin],
  getUserByIdController
);
router.get(
  "/get-current-user",
  [isAuthentication],
  getCurrentUserController
);
router.delete(
  "/admin/delete-user/:id",
  [isAuthentication, isAdmin],
  deleteUserController
);
router.put("/update", [isAuthentication], updateUser);

export default router;
