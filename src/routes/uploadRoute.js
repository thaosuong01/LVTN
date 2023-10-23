import express from "express";
import multer from "multer";
import { uploadDocument } from "../controllers/uploadController.js";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = "src/uploads";

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/document", upload.array("file"), uploadDocument);

export default router;
