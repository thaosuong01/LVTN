import express from "express";
import fs from "fs";
import multer from "multer";
import {
  createExerciseController,
  deleteExerciseController,
  getExerciseByClassIdController,
  getExerciseByIdController,
  updateExerciseController,
} from "../controllers/exerciseController.js";
import fSlug from "../config/fslug.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = "src/uploads/exercises";

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
router.post("/create", upload.array("files"), createExerciseController);
router.get("/get-exercise-by-class-id/:cid", getExerciseByClassIdController);
router.get("/get-exercise-by-id/:eid", getExerciseByIdController);
router.delete("/delete-exercise/:eid", deleteExerciseController);
router.put(
  "/update-exercise/:eid",
  upload.array("files"),
  updateExerciseController
);

export default router;
