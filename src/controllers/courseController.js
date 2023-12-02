import { ApiError } from "../middlewares/api-error.js";
import Course from "../models/Course.js";

export const createCourseController = async (req, res, next) => {
  try {
    const { course_code, course_name, department_id } = await req.body;

    const exist = await Course.findOne({ course_code });

    if (exist) {
      return res.status(409).json("Course already exists");
    }

    const course = await Course.create({
      course_code,
      course_name,
      department_id,
    });

    return res.status(201).json(course);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const updateCourseController = async (req, res, next) => {
  try {
    const course_id = await req.params.id;

    const { course_code, course_name, department_id } = await req.body;

    const courseExists = await Course.exists({ course_code });
    console.log('courseExists: ', courseExists);

    if (courseExists && course_id === courseExists._id) {
      return next(new ApiError(409, "Course code already exists"));
    }

    const update = await Course.findByIdAndUpdate(
      course_id,
      {
        course_code,
        course_name,
        department_id,
      },
      { new: true }
    ).populate("department_id", "department_name");

    if (!update) {
      return next(new ApiError(404, "Course not found"));
    }

    return res.status(200).json(update);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getAllCourseController = async (req, res, next) => {
  try {
    const courses = await Course.find().populate(
      "department_id",
      "department_name"
    );

    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getCourseByIDController = async (req, res, next) => {
  try {
    const course_id = await req.params.cid;
    const course = await Course.findById(course_id).populate(
      "department_id",
      "department_name"
    );

    if (!course) {
      return next(new ApiError(404, "Course not found"));
    }
    return res.status(200).json(course);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getCourseByDepartmentController = async (req, res, next) => {
  try {
    const depart_id = await req.params.did;

    const courses = await Course.find({ department_id: depart_id }).select(
      "course_code course_name"
    ).populate("department_id", "department_name");

    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};


export const deleteCourseController = async (req, res, next) => {
  try {
    const course_id = await req.params.id;

    const deleteCourse = await Course.findByIdAndDelete(course_id);

    if (!deleteCourse) {
      return next(new ApiError(404, "Course not found"));
    }

    return res.status(200).send("Course deleted successfully");
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};
