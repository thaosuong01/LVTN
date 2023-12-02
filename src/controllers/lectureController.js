import { ApiError } from "../middlewares/api-error.js";
import Lecture from "../models/Lecture.js";

export const addVideoLecture = async (req, res, next) => {
  try {
    const { class_id, topic_id, title, video_link } = req.body;

    const lecture = await Lecture.create({
      class_id,
      topic_id,
      title,
      video_link,
    });

    return res.status(201).json({ lecture });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getLectureController = async (req, res, next) => {
  try {
    const classId = req.params.cid;

    const lectures = await Lecture.find({ class_id: classId });
  

    return res.status(200).json({ lectures });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getLectureByIdController = async (req, res, next) => {
    try {
      const lectureId = req.params.lid;
  
      const lecture = await Lecture.findById(lectureId);
      if (!lecture) {
        return next(new ApiError(404, "Lecture not found"));
      }
  
      return res.status(200).json(lecture);
    } catch (error) {
      console.log(error);
      next(new ApiError(500, error.message));
    }
  };

export const updateVideoLecture = async (req, res, next) => {
  try {
    const lectureId = await req.params.lid;
    const { title, video_link } = req.body;

    const updatedLecture = await Lecture.findByIdAndUpdate(
      lectureId,
      { title, video_link },
      { new: true }
    );

    if (!updatedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    return res.status(200).json({ lecture: updatedLecture });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const deleteLectureController = async (req, res, next) => {
    try {
      const lectureId = await req.params.lid;
  
      const deleteLecture = await Lecture.findByIdAndDelete(lectureId);
  
      if (!deleteLecture) {
        return next(new ApiError(404, "Lecture not found"));
      }
  
      return res.status(200).send("Lecture deleted successfully");
    } catch (error) {
      console.log(error);
      next(new ApiError(500, error.message));
    }
  };