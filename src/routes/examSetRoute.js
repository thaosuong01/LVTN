import express from "express";
import { createExamSet, getExamSetByClassId, getExamSetById, getExamSets } from "../controllers/examSetController.js";
import { isAuthentication, isTeacher } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create", [isAuthentication,isTeacher], createExamSet);
router.get("/get-all", [isAuthentication,isTeacher], getExamSets);
router.get("/get-by-class/:class_id", [isAuthentication,isTeacher], getExamSetByClassId);
router.get("/get-by-id/:exam_id", [isAuthentication,isTeacher], getExamSetById);


export default router;
