import instance from "../axiosSetup.js";

export const apigetDepartmentWithCourse = async () => {
  try {
    return instance({
      method: "GET",
      url: "/api/department/get-department-with-courses",
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetDepartment = async () => {
  try {
    return instance({
      method: "GET",
      url: "/api/department/",
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetDepartmentByID = async (did) => {
  try {
    return instance({
      method: "GET",
      url: `/api/department/get-department/${did}`,
    });
  } catch (error) {
    console.log(error);
  }
};

