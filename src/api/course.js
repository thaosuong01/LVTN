import instance from "../axiosSetup.js";

export const apiGetCourseByDepartment = async (did) => {
  try {
    return instance({
      method: "GET",
      url: `/api/course/get-course-by-depart/${did}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetCourseByID = async (cid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/course/get-course/${cid}`,
    });
  } catch (error) {
    console.log(error);
  }
};
