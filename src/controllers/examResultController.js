import { ApiError } from "../middlewares/api-error.js";
import ExamResult from "../models/ExamResult.js";

export const updateExamResult = async (req, res, next) => {
  try {
    const {
      exam_set_id,
      correctPoints,
      totalPoints,
      numberOfCorrectAnswers,
      numberOfIncorrectAnswers,
      numberOfQuestions,
      user_id,
      attempt_count,
    } = req.body;

    // Sử dụng findOneAndUpdate
    const filter = { exam_set_id, user_id }; // Điều kiện tìm kiếm
    const update = {
      exam_set_id,
      correctPoints,
      totalPoints,
      numberOfCorrectAnswers,
      numberOfIncorrectAnswers,
      numberOfQuestions,
      user_id,
      attempt_count,
    }; // Dữ liệu cập nhật

    // Thiết lập các tùy chọn, sử dụng { upsert: true } để tạo mới nếu không tìm thấy
    const options = { upsert: true, new: true, useFindAndModify: false };

    const examResult = await ExamResult.findOneAndUpdate(
      filter,
      update,
      options
    );

    return res.status(200).json(examResult);
  } catch (error) {
    console.log("error: ", error);
    next(new ApiError(500, error.message));
  }
};

export const getExamResult = async (req, res, next) => {
  try {
    const { exam_set_id, user_id } = req.query;

    const response = await ExamResult.findOne({ exam_set_id, user_id });
    return res.status(200).json(response);
  } catch (error) {
    console.log("error: ", error);
    next(new ApiError(500, error.message));
  }
};

export const getExamResults = async (req, res, next) => {
  try {
    const response = await ExamResult.find()
      .populate("user_id")
      .populate("exam_set_id");
    return res.status(200).json(response);
  } catch (error) {
    console.log("error: ", error);
    next(new ApiError(500, error.message));
  }
};
