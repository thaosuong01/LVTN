import express from "express";
import {
  addStudentToClass,
  enrolmentController,
  getClassEnrolOfStudent,
  getEnrolledStudents,
  removeEnrollment,
} from "../controllers/enrolController.js";
import { isAuthentication } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create", [isAuthentication], enrolmentController);
router.post("/add-student-to-class", addStudentToClass);
router.get("/get-student-enrol-in-class/:cid", getEnrolledStudents);
router.delete("/delete-student-enrol-in-class/:eid", removeEnrollment);
router.get(
  "/get-class-enrol-of-student",
  [isAuthentication],
  getClassEnrolOfStudent
);

export default router;
