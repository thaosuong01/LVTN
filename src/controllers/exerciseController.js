import { ApiError } from "../middlewares/api-error.js";
import Exercise from "../models/Exercise.js";
import fs from "fs";

export const createExerciseController = async (req, res, next) => {
  try {
    const file_name = req?.files?.map((item) => item?.filename);

    const { title, files, deadline, start_time, class_id, topic_id, display } =
      await req.body;

    // Check unique title
    // const exerciseExist = await Exercise.findOne({ title });
    // if (exerciseExist) {
    if (file_name?.length > 0) {
      for (const file of file_name) {
        fs.unlink(`src/uploads/exercises/${file}`, (err) => {
          if (err) throw err;
        });
      }
    }

    const exercise = await Exercise.create({
      title,
      files,
      deadline,
      start_time,
      class_id,
      topic_id,
      files: file_name,
      display,
    });

    return res.status(201).json(exercise);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const updateExerciseController = async (req, res, next) => {
  try {
    const { eid } = req.params;
    const { title, deadline, start_time, newFiles, display } = req.body;
    const file_name = req?.files?.map((item) => item?.filename);
    // Kiểm tra xem bài tập có tồn tại hay không
    const findExercise = await Exercise.findById(eid);
    if (!findExercise) {
      if (file_name?.length > 0) {
        for (const file of file_name) {
          fs.unlink(`src/uploads/exercises/${file}`, (err) => {
            if (err) throw err;
          });
        }
      }
      throw new ApiError(404, "Exercise not found");
    }

    // Kiểm tra xem tên bài tập có trùng với các bài tập khác hay không
    const exerciseExist = await Exercise.findOne({
      title,
      _id: { $ne: eid },
    });
    if (exerciseExist) {
      if (file_name?.length > 0) {
        for (const file of file_name) {
          fs.unlink(`src/uploads/exercises/${file}`, (err) => {
            if (err) throw err;
          });
        }
      }
      throw new ApiError(409, "Title already exists");
    }

    // Lưu trữ danh sách tệp tin cũ

    // Get file in old document
    const oldExercise = await Exercise.findOne({ _id: eid });
    // const oldFiles = [...oldExercise.files];

    let files = [];
    // so sánh giữa file cũ trên db và file mới truyền xuống từ fe => lấy ra file cũ trên db mà không nằm trong danh sach những file mới truyền xuống
    if (oldExercise && oldExercise.files) {
      const removeFile = oldExercise.files.filter((item) => {
        return !newFiles?.split(",")?.includes(item);
      });

      if (removeFile?.length > 0) {
        for (const file of removeFile) {
          fs.unlink(`src/uploads/exercises/${file}`, (err) => {
            if (err) throw err;
          });
        }
      }

      files = oldExercise.files.filter((item) => {
        return newFiles?.split(",")?.includes(item);
      });
    }

    req?.files?.forEach((item) => {
      files.push(item?.filename);
    });

    // Cập nhật thông tin bài tập và danh sách tệp tin mới
    const exercise = await Exercise.findByIdAndUpdate(
      eid,
      {
        title,
        deadline,
        start_time,
        files,
        display,
      },
      { new: true }
    );

    return res.status(200).json(exercise);
  } catch (error) {
    console.log("error: ", error);
    // Xóa các tệp tin mới khi có lỗi xảy ra
    if (req.files) {
      for (const file of req.files) {
        fs.unlink(file.path, (err) => {
          if (err) throw err;
        });
      }
    }
    next(new ApiError(500, error.message));
  }
};

export const deleteExerciseController = async (req, res, next) => {
  try {
    const { eid } = req.params;

    // Kiểm tra xem bài tập có tồn tại hay không
    const exercise = await Exercise.findById(eid);
    if (!exercise) {
      throw new ApiError(404, "Exercise not found");
    }

    // Xóa tệp tin liên quan đến bài tập
    for (const file of exercise?.files) {
      fs.unlink(`src/uploads/exercises/${file}`, (err) => {
        if (err) throw err;
      });
    }

    // Xóa bài tập
    await Exercise.findByIdAndDelete(eid);

    return res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getExerciseByIdController = async (req, res, next) => {
  try {
    const { eid } = req.params;

    // Lấy thông tin bài tập theo ID
    const exercise = await Exercise.findById(eid);
    if (!exercise) {
      throw new ApiError(404, "Exercise not found");
    }

    return res.status(200).json(exercise);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getExerciseByClassIdController = async (req, res, next) => {
  try {
    const { cid } = req.params;

    // Lấy thông tin bài tập theo ID
    const exercise = await Exercise.find({ class_id: cid });
    if (!exercise) {
      throw new ApiError(404, "Exercise not found");
    }

    return res.status(200).json(exercise);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getExercisesController = async (req, res, next) => {
  try {
    // Lấy danh sách tất cả bài tập
    const exercises = await Exercise.find();

    return res.status(200).json(exercises);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
