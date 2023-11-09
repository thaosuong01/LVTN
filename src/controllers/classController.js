import { ApiError } from "../middlewares/api-error.js";
import bcrypt from "bcrypt";
import Class from "../models/Class.js";

export const createClassController = async (req, res, next) => {
  try {
    const { class_code, class_name, class_pass, course_id, display } = req.body;

    const conflictCourses = await Class.find({ course_id });

    if (conflictCourses.length > 0) {
      for (const item of conflictCourses) {
        if (item.class_code === class_code) {
          return next(new ApiError(409, "Class code already exists")); // class_code trùng khớp
        }
      }
    }

    const { user_id } = req.account;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(class_pass, salt);

    const createClass = await Class.create({
      class_code,
      class_name,
      class_pass: passwordHash,
      owner: user_id,
      course_id,
      display,
    });

    const classes = await createClass.populate("course_id");

    return res.status(201).json(classes);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getAllClassController = async (req, res, next) => {
  try {
    const classes = await Class.find()
      .populate("course_id", "course_code course_name")
      .populate("owner", "fullname")
      .select("-class_pass");

    res.status(200).json(classes);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getClassByIdController = async (req, res, next) => {
  try {
    const getClass = await Class.findById(req.params.id)
      .populate("course_id", "course_code course_name")
      .select("-class_pass");

    if (!getClass) {
      return next(new ApiError(404, "Class not found"));
    }

    res.status(200).json(getClass);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const updateClassController = async (req, res, next) => {
  try {
    const class_id = await req.params.id;

    const { class_code, class_name, class_pass, course_id, display } =
      await req.body;

    const update = await Class.findByIdAndUpdate(
      class_id,
      {
        class_code,
        class_name,
        class_pass,
        course_id,
        display,
      },
      { new: true }
    )
      .populate("course_id", "course_code course_name")
      .select("-class_pass");

    if (!update) {
      return next(new ApiError(404, "Class not found"));
    }

    return res.status(201).json(update);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const deleteClassController = async (req, res, next) => {
  try {
    const class_id = await req.params.id;

    const deleteClass = await Class.findByIdAndDelete(class_id);

    if (!deleteClass) {
      return next(new ApiError(404, "Class Not Found"));
    }

    return res.status(201).send("Class deleted successfully");
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getClassInCourseController = async (req, res, next) => {
  try {
    const course_id = await req.params.cid;

    const getClass = await Class.find({ course_id: course_id }).populate(
      "owner",
      "fullname"
    );

    return res.status(200).json(getClass);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};
