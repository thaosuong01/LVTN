import express from "express";
import {
  addManyStudentToClass,
  addStudentToClass,
  checkEnrol,
  enrolmentController,
  getClassEnrolOfStudent,
  getEnrolledStudents,
  removeEnrollment,
} from "../controllers/enrolController.js";
import { isAuthentication } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create", [isAuthentication], enrolmentController);
router.post("/add-student-to-class", addStudentToClass);
router.post("/add-many-student-to-class", addManyStudentToClass);
router.get(
  "/get-class-enrol-of-student",
  [isAuthentication],
  getClassEnrolOfStudent
);
router.get("/check-enrol/:class_id", [isAuthentication], checkEnrol);
router.get("/get-student-enrol-in-class/:cid", getEnrolledStudents);
router.delete("/delete-student-enrol-in-class/:eid", removeEnrollment);

export default router;
