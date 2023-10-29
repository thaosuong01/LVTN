import express from "express";
import fs from "fs";
import multer from "multer";
import {
  deleteDocumentById,
  getDocumentById,
  getDocumentsByClassId,
  updateDocumentById,
  uploadDocument,
} from "../controllers/uploadController.js";
import slugify from "slugify";

export const fSlug = (text) =>
  slugify(text, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

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
    cb(null, Buffer.from(fSlug(file.originalname), "latin1").toString("utf8"));
  },
});

const upload = multer({ storage: storage });

router.post("/document", upload.array("files"), uploadDocument);
router.get("/document/:did", getDocumentById);
router.delete("/delete-document/:did", deleteDocumentById);
router.put("/update-document/:did", upload.array("files"), updateDocumentById);
router.get("/document-by-class-id/:cid", getDocumentsByClassId);

export default router;
