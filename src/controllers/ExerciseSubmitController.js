import { ApiError } from "../middlewares/api-error.js";
import ExerciseSubmit from "../models/ExerciseSubmit.js";
import fs from "fs";

export const createExerciseSubmitController = async (req, res, next) => {
  try {
    const { student_id, exercise_id } = req.body;
    const filename = req?.files?.map((item) => item?.filename);

    if (!student_id || !exercise_id) {
      throw new ApiError(400, "Miss input");
    }

    const exerciseSubmit = await ExerciseSubmit.create({
      files: filename,
      student_id,
      exercise_id,
    });
    return res.status(201).json(exerciseSubmit);
  } catch (error) {
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

export const updateExerciseSubmitController = async (req, res, next) => {
  try {
    const { es_id } = req.params;
    const { newFiles } = req.body;
    const file_name = req.files?.map((file) => file.filename);
    console.log("file_name: ", file_name);

    const oldExerciseSubmit = await ExerciseSubmit.findById(es_id);

    let files = [];
    if (oldExerciseSubmit && oldExerciseSubmit.files) {
      const removeFile = oldExerciseSubmit.files.filter((item) => {
        return !newFiles?.split(",")?.includes(item);
      });

      if (removeFile?.length > 0) {
        for (const file of removeFile) {
          fs.unlink(`src/uploads/exercise-submit/${file}`, (err) => {
            if (err) throw err;
          });
        }
      }

      files = oldExerciseSubmit.files.filter((item) => {
        return newFiles?.split(",")?.includes(item);
      });
    }

    req?.files?.forEach((item) => {
      files.push(item?.filename);
    });

    const exerciseSubmit = await ExerciseSubmit.findByIdAndUpdate(
      es_id,
      {
        ...req.body,
        files,
      },
      { new: true }
    );

    return res.status(200).json(exerciseSubmit);
  } catch (error) {
    next(new ApiError(500, error.message));
    // Delete file when failure
  }
};

export const deleteExerciseSubmitById = async (req, res, next) => {
  try {
    const { es_id } = req.params;
    const exerciseSubmit = await ExerciseSubmit.findByIdAndDelete(es_id);

    if (!exerciseSubmit) {
      throw new ApiError(404, "Exercise submit not found");
    }
    return res
      .status(200)
      .json({ message: "Exercise submit deleted successfully" });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getExerciseSubmitById = async (req, res, next) => {
  try {
    const { es_id } = req.params;
    const exerciseSubmit = await ExerciseSubmit.findById(es_id);

    if (!exerciseSubmit) {
      throw new ApiError(404, "Exercise submit not found");
    }
    return res.status(200).json(exerciseSubmit);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getExerciseSubmitByExerciseId = async (req, res, next) => {
  try {
    const { eid } = req.params;
    const exerciseSubmit = await ExerciseSubmit.find({
      exercise_id: eid,
    }).populate({
      path: "student_id",
      select: "fullname email",
      populate: { path: "account_id", select: "username" },
    });

    if (!exerciseSubmit) {
      throw new ApiError(404, "Exercise submit not found");
    }
    return res.status(200).json(exerciseSubmit);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getExerciseSubmitByStudentId = async (req, res, next) => {
  try {
    const { sid } = req.params;
    const exerciseSubmit = await ExerciseSubmit.find({ student_id: sid });

    if (!exerciseSubmit) {
      throw new ApiError(404, "Exercise submit not found");
    }
    return res.status(200).json(exerciseSubmit);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
