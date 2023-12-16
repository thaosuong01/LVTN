import express from "express";
import {
  createCourseController,
  deleteCourseController,
  getAllCourseController,
  getCourseByDepartmentController,
  getCourseByIDController,
  getCoursesByCode,
  removeCourseController,
  updateCourseController,
} from "../controllers/courseController.js";
import { isAdmin, isAuthentication } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create", [isAuthentication, isAdmin], createCourseController);
router.put("/update/:id", updateCourseController);
router.put("/remove-course/:id", removeCourseController);
router.get("/", getAllCourseController);
router.get("/get-course-by-code/:course_code", getCoursesByCode);
router.get("/get-course/:cid", getCourseByIDController);
router.get("/get-course-by-depart/:did", getCourseByDepartmentController);
router.delete("/delete/:id", deleteCourseController);

export default router;
