import { ApiError } from "../middlewares/api-error.js";
import Enrol from "../models/Enrol.js";
import Class from "../models/Class.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Account from "../models/Account.js";

// Sinh viên tự ghi danh vào lớp học
export const enrolmentController = async (req, res, next) => {
  try {
    const { user_id } = req.account;
    const { class_id, class_pass } = await req.body;

    let isCorrectPassword = true;
    if (class_pass) {
      const findClass = await Class.findById(class_id);
      console.log("findClass: ", findClass);
      console.log("findClass?.class_pass: ", findClass?.class_pass);
      isCorrectPassword = bcrypt.compareSync(class_pass, findClass?.class_pass);
    }
    console.log("isCorrectPassword: ", isCorrectPassword);

    if (!isCorrectPassword) {
      throw new ApiError(400, "Password is incorrect");
    }

    const createEnrol = await Enrol.create({
      user_id,
      class_id,
    });

    if (!createEnrol) {
      throw new ApiError(400, "Enrol failed");
    }

    return res.status(201).json(createEnrol);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

// Giáo viên thêm sinh viên vào lớp học
export const addStudentToClass = async (req, res, next) => {
  try {
    const { class_id, username } = req.body;
    // Tìm account dựa trên username
    const account = await Account.findOne({ username });
    if (!account) {
      throw new ApiError(404, "Account not found");
    }

    // Tìm user dựa trên account_id
    const user = await User.findOne({ account_id: account._id });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const existingEnrolment = await Enrol.findOne({
      user_id: user._id,
      class_id,
    });
    if (existingEnrolment) {
      throw new ApiError(404, "Student already enrolled in the class");
    }

    const createEnrol = await Enrol.create({
      user_id: user._id,
      class_id,
    });

    if (!createEnrol) {
      throw new ApiError(400, "Failed to add student to class");
    }

    return res.status(201).json(createEnrol);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

// Lấy ra danh sách sinh viên đã enrol vào lớp học nào đó
export const getEnrolledStudents = async (req, res, next) => {
  try {
    const { cid } = await req.params;

    const enrolledStudents = await Enrol.find({
      class_id: cid,
    }).populate({
      path: "user_id",
      select: "fullname email",
      populate: { path: "account_id", select: "username" },
    });

    return res.status(200).json(enrolledStudents);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

// Sinh viên lấy ra danh sách lớp mà mình đã enrol
export const getClassEnrolOfStudent = async (req, res, next) => {
  try {
    const { user_id } = await req.account;

    const enrolledStudents = await Enrol.find({
      user_id: user_id,
    })
      .populate({
        path: "class_id",
        select: "class_name class_code",
        populate: {
          path: "owner",
          select: "fullname",
        },
      })
      .populate({
        path: "class_id",
        populate: {
          path: "course_id",
          select: "course_code course_name",
        },
      });

    return res.status(200).json(enrolledStudents);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

//Gv xóa ghi danh sinh viên ra khỏi lớp học
export const removeEnrollment = async (req, res, next) => {
  try {
    const enrollmentId = req.params.eid;

    const removedEnrollment = await Enrol.findByIdAndDelete(enrollmentId);

    if (!removedEnrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    return res.status(200).json({ message: "Enrollment removed successfully" });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

// Kiểm tra sinh viên đã ghi danh vào lớp học ... chưa
export const checkEnrol = async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const { user_id } = await req.account;

    if (!user_id || !class_id) {
      throw new ApiError(400, "Missing input");
    }

    const enroledStudent = await Enrol.findOne({
      user_id,
      class_id,
    });

    if (!enroledStudent) {
      return res.status(200).json({
        result: 0,
        message: "Sinh viên chưa ghi danh",
      });
    }

    return res.status(200).json({
      result: 1,
      message: "Sinh viên đã ghi danh",
      enrol_id: enroledStudent._id,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
