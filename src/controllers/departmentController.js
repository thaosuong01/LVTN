import { ApiError } from "../middlewares/api-error.js";
import Course from "../models/Course.js";
import Department from "../models/Department.js";

export const createDepartmentController = async (req, res, next) => {
  try {
    const { department_name } = await req.body;

    if (!department_name) {
      throw new Error("Please fill all fields");
    }

    const existDepartment = await Department.findOne({ department_name });
    //exist user
    if (existDepartment) {
      return res.status(409).json("Department already exists");
    }

    const newDepartment = await Department.create({
      department_name: department_name,
      delete: false,
    });

    return res.status(201).json(newDepartment);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getAllDepartmentController = async (req, res, next) => {
  try {
    const departments = await Department.find();

    return res.status(200).json(departments);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getDepartmentsWithCourses = async (req, res, next) => {
  try {
    const departments = await Department.find();
    console.log("departments: ", departments);

    // Tạo một mảng chứa thông tin các khoa và khóa học
    const departmentsWithCourses = [];

    // Lặp qua từng khoa
    for (const department of departments) {
      // Lấy danh sách các khóa học trong khoa hiện tại
      const courses = await Course.find({ department_id: department._id });

      // Thêm thông tin khoa và danh sách khóa học vào mảng
      departmentsWithCourses.push({
        department: department.department_name,
        department_id: department._id,
        delete: department.delete,
        courses: courses.map((course) => ({
          id: course._id,
          name: course.course_name,
          code: course.course_code,
        })),
      });
    }

    return res.status(200).json(departmentsWithCourses);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const updateDepartmentController = async (req, res, next) => {
  try {
    const { department_name, description } = await req.body;
    const department_id = await req.params.id;

    const departmentExists = await Department.exists({ department_name });

    if (departmentExists && department_id !== departmentExists.id) {
      return next(new ApiError(409, "Department name already exists"));
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      department_id,
      {
        department_name: department_name,
        description: description,
      },
      { new: true }
    );

    if (!updatedDepartment) {
      return next(new ApiError(404, "Department not found"));
    }

    return res.status(200).json(updatedDepartment);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getDepartmentByIdController = async (req, res, next) => {
  try {
    const department_id = req.params.id;
    const department = await Department.findById(department_id);

    if (!department) {
      return next(new ApiError(404, "Department not found"));
    }

    return res.status(200).json(department);
  } catch (error) {
    next(new ApiError(500, error.message));
    console.log(error);
  }
};

export const deleteDepartmentController = async (req, res, next) => {
  try {
    const department_id = req.params.id;
    const deletedDepartment = await Department.findByIdAndDelete(department_id);

    if (!deletedDepartment) {
      return next(new ApiError(404, "Department not found"));
    }

    return res.status(204).json({ message: "Department deleted successfully" });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const removeDepartmentController = async (req, res, next) => {
  try {
    const department_id = req.params.id;
    const updatedDepartment = await Department.findByIdAndUpdate(
      department_id,
      { delete: true }, // Assuming 'deleted' property to indicate soft deletion
      { new: true }
    );

    if (!updatedDepartment) {
      return next(new ApiError(404, "Department not found"));
    }

    return res
      .status(200)
      .json({ message: "Department soft-deleted successfully" });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
