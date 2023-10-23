import express from "express";
import {
  createDepartmentController,
  deleteDepartmentController,
  getAllDepartmentController,
  getDepartmentByIdController,
  getDepartmentsWithCourses,
  updateDepartmentController,
} from "../controllers/departmentController.js";

const router = express.Router();

router.post("/create", createDepartmentController);
router.get("/", getAllDepartmentController);
router.get("/get-department-with-courses", getDepartmentsWithCourses);
router.get("/get-department/:did", getDepartmentByIdController);
router.put("/update/:id", updateDepartmentController);
router.delete("/:id", deleteDepartmentController);

export default router;
