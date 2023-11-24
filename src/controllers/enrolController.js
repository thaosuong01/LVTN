import { ApiError } from "../middlewares/api-error.js";
import Enrol from "../models/Enrol.js";
import Class from "../models/Class.js";
import bcrypt from "bcrypt";

export const enrolmentController = async (req, res, next) => {
  try {
    const { user_id } = req.account;
    console.log("user_id: ", user_id);
    const { class_id, class_pass } = await req.body;
    console.log("class_pass: ", class_pass);

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
