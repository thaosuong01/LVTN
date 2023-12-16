import express from "express";
import {
  createExamSet,
  deleteExamSet,
  getExamSetByClassId,
  getExamSetById,
  getExamSets,
  updateExamSet,
} from "../controllers/examSetController.js";
import { isAuthentication, isTeacher } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create", [isAuthentication, isTeacher], createExamSet);
router.get("/get-all", [isAuthentication, isTeacher], getExamSets);
router.get("/get-by-class/:class_id", [isAuthentication], getExamSetByClassId);
router.get("/get-by-id/:exam_id", [isAuthentication], getExamSetById);
router.put("/update/:exam_id", [isAuthentication], updateExamSet);
router.delete("/delete/:exam_id", [isAuthentication], deleteExamSet);

export default router;
