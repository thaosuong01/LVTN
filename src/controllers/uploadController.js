import { ApiError } from "../middlewares/api-error.js";
import Document from "../models/Document.js";
import slugify from "slugify";
import fs from "fs";
import Enrol from "../models/Enrol.js";
import sendMail from "../config/send-mail.js";

export const uploadDocument = async (req, res, next) => {
  try {
    const file_name = req?.files?.map((file) =>
      slugify(file.filename, { lower: true, locale: "vi" })
    );

    const { class_id, topic_id, title, isNotify } = await req.body;
    console.log("req.body: ", req.body);

    const document = await Document.create({
      class_id,
      topic_id,
      title,
      files: file_name,
    });

    if (document && isNotify === "true") {
      //Lấy ra danh sách email của sinh viên trong lớp
      const students = await Enrol.find({ class_id })
        .populate("user_id", "email")
        .populate("class_id");
      console.log("students: ", students);
      const emails = students?.map((student) => student?.user_id?.email);
      console.log("emails: ", emails);
      const html = `Giáo viên vừa thêm ${title} vào lớp <b>${students[0]?.class_id?.class_name}</b>. Click vào <a href="http://localhost:5173/course/class/${class_id}">Link</a> để xem chi tiết.`;

      const rs = await sendMail({ html,emails });
      console.log("rs: ", rs);
      rs?.accepted?.length > 0 &&
        console.log("Gửi mail thành công cho: " + rs?.accepted);
      rs?.rejected?.length > 0 &&
        console.log("Gửi mail Thất bại cho: " + rs?.rejected);
    }

    return res.status(201).json({ document });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getDocumentById = async (req, res, next) => {
  try {
    const documentId = req.params.did;

    const document = await Document.findById(documentId).populate({
      path: "class_id",
      select: "class_name class_code",
      populate: { path: "owner", select: "fullname" },
    });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getDocumentController = async (req, res, next) => {
  try {
    const classId = req.params.cid;

    const documents = await Document.find({ class_id: classId });
    if (!documents.length) {
      throw new ApiError(404, "No documents found for the topic");
    }

    return res.status(200).json({ documents });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getDocumentsByClassId = async (req, res, next) => {
  try {
    const classId = req.params.cid;

    const documents = await Document.find({ class_id: classId });
    if (!documents) {
      throw new ApiError(404, "No documents found");
    }

    return res.status(200).json({ documents });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getDocumentsController = async (req, res, next) => {
  try {
    const documents = await Document.find().populate(
      "class_id",
      "class_code class_name"
    );
    console.log("documents: ", documents);

    return res.status(200).json({ documents });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const updateDocumentById = async (req, res, next) => {
  try {
    const { did } = req.params;
    const { newFiles, title } = req.body;

    // Get file in old document
    const oldDoc = await Document.findOne({ _id: did });

    let files = [];
    if (oldDoc && oldDoc.files) {
      const removeFile = oldDoc.files.filter((item) => {
        return !newFiles?.split(",")?.includes(item);
      });

      if (removeFile?.length > 0) {
        for (const file of removeFile) {
          fs.unlink(`src/uploads/${file}`, (err) => {
            if (err) throw err;
          });
        }
      }

      files = oldDoc.files.filter((item) => {
        return newFiles?.split(",")?.includes(item);
      });
    }

    req?.files?.forEach((item) => {
      files.push(item?.filename);
    });

    const document = await Document.findByIdAndUpdate(
      did,
      { title, files },
      { new: true }
    );

    return res.status(200).json({
      message: "Cập nhật tài liệu thành công!",
      document,
    });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

// Delete document by id
export const deleteDocumentById = async (req, res, next) => {
  try {
    const { did } = req.params;

    const document = await Document.findById(did);
    if (!document) {
      throw new ApiError(404, "Document not found");
    }

    const files = document.files;

    if (files?.length > 0) {
      for (const file of files) {
        fs.unlink(`src/uploads/${file}`, (err) => {
          if (err) throw err;
        });
      }
    }

    await Document.findByIdAndDelete(did);

    return res.status(200).json({
      message: "Xóa tài liệu thành công!",
    });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};
