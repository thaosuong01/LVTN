import instance from "../axiosSetup.js";

export const apiGetUserEnroledByClass = async (cid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/enrol/get-student-enrol-in-class/${cid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteStudentEnroled = async (eid) => {
  try {
    return instance({
      method: "DELETE",
      url: `/api/enrol/delete-student-enrol-in-class/${eid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetClassEnrolOfStudent = async (id) => {
  try {
    return instance({
      method: "GET",
      url: "/api/enrol/get-class-enrol-of-student",
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiCreateEnrol = async (data) => {
  try {
    return instance({
      method: "POST",
      url: `/api/enrol/create`,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
