import express from "express";
import { addVideoLecture, deleteLectureController, getLectureByIdController, getLectureController, updateVideoLecture } from "../controllers/lectureController.js";

const router = express.Router();

router.post("/create", addVideoLecture);
router.get("/get-lecture-in-class/:cid", getLectureController);
router.put("/update-lecture/:lid", updateVideoLecture);
router.get("/get-lecture/:lid", getLectureByIdController);
router.delete("/delete-lecture/:lid", deleteLectureController);

export default router;
