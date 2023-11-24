import express from "express";
import {
  createClassController,
  deleteClassController,
  getAllClassController,
  getClassByIdController,
  getClassCreatedByOwner,
  getClassInCourseController,
  updateClassController,
} from "../controllers/classController.js";
import { isAuthentication, isTeacher } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create", [isAuthentication], createClassController);
router.get("/", getAllClassController);
router.get("/get-class/:id", getClassByIdController);
router.put("/update-class/:id", updateClassController);
router.delete("/delete-class/:id", deleteClassController);
router.get("/get-class-in-course/:cid", getClassInCourseController);
router.get(
  "/get-class-created-by-owner/",
  [isAuthentication, isTeacher],
  getClassCreatedByOwner
);

export default router;
