import express from "express";
import fs from "fs";
import multer from "multer";
import fSlug from "../config/fslug.js";
import {
  createExerciseSubmitController,
  deleteExerciseSubmitById,
  getExerciseSubmitByExerciseId,
  getExerciseSubmitById,
  getExerciseSubmitByStudentId,
  gradeAndReviewExerciseSubmit,
  updateExerciseSubmitController,
} from "../controllers/ExerciseSubmitController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = "src/uploads/exercise-submit";

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    cb(null, path);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    cb(
      null,

      `${timestamp}_${Buffer.from(fSlug(file.originalname), "latin1").toString(
        "utf8"
      )}`
    );
  },
});

const upload = multer({ storage: storage });
// router.get("/get-all", getExerciseSubmits);
router.post("/create", upload.array("files"), createExerciseSubmitController);

router.get("/get-by-id/:es_id", getExerciseSubmitById);

router.get("/get-by-exercise-id/:eid", getExerciseSubmitByExerciseId);

router.get("/get-by-student-id/:sid", getExerciseSubmitByStudentId);

router.delete("/delete/:es_id", deleteExerciseSubmitById);

router.put(
  "/update/:es_id",
  upload.array("files"),
  updateExerciseSubmitController
);

router.put("/grade-and-comment/:es_id", gradeAndReviewExerciseSubmit);

export default router;
