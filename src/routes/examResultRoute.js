import express from "express";
import { getExamResult, getExamResults, updateExamResult } from "../controllers/examResultController.js";
import { isAuthentication } from "../middlewares/auth-middleware.js";

const router = express.Router();


router.put("/update", [isAuthentication], updateExamResult);
router.get("/", [isAuthentication], getExamResult);
router.get("/get-all", [isAuthentication], getExamResults);

export default router;
