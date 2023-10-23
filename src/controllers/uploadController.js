import { ApiError } from "../middlewares/api-error.js";
import Document from "../models/Document.js";
import File from "../models/File.js";

export const uploadDocument = async (req, res, next) => {
  try {
    console.log(req.files);
    const { class_id, topic_id, title } = await req.body;

    const upload = await Document.create({
      class_id,
      topic_id,
      title,
    });

    const file = await File.create({
      document_id: upload._id,
      file_name: req.files.originalname,
    });

    return res.status(201).json({ upload, file });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};
