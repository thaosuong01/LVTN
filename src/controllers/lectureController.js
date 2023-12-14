import sendMail from "../config/send-mail.js";
import { ApiError } from "../middlewares/api-error.js";
import Enrol from "../models/Enrol.js";
import Lecture from "../models/Lecture.js";

export const addVideoLecture = async (req, res, next) => {
  try {
    const { class_id, topic_id, title, video_link, isNotify } = req.body;

    const lecture = await Lecture.create({
      class_id,
      topic_id,
      title,
      video_link,
    });

    if (lecture && isNotify) {
      //Lấy ra danh sách email của sinh viên trong lớp
      const students = await Enrol.find({ class_id })
        .populate("user_id", "email")
        .populate("class_id");
      console.log("students: ", students);
      const emails = students?.map((student) => student?.user_id?.email);
      console.log("emails: ", emails);
      const html = `Giáo viên vừa thêm ${title} vào lớp <b>${students[0]?.class_id?.class_name}</b>. Click vào <a href="http://localhost:5173/course/class/${class_id}">Link</a> để xem chi tiết.`;

      const rs = await sendMail({ html, emails });
      console.log("rs: ", rs);
      rs?.accepted?.length > 0 &&
        console.log("Gửi mail thành công cho: " + rs?.accepted);
      rs?.rejected?.length > 0 &&
        console.log("Gửi mail Thất bại cho: " + rs?.rejected);
    }

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
