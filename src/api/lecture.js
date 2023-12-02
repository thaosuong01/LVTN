import instance from "../axiosSetup.js";

export const apiAddLectureVideo = async (data) => {
  try {
    return instance({
      method: "POST",
      url: "/api/lecture/create",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiUpdateLectureVideo = async (lid, data) => {
  try {
    return instance({
      method: "PUT",
      url: `/api/lecture/update-lecture/${lid}`,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetLectureByClassId = async (cid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/lecture/get-lecture-in-class/${cid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteLecture = async (lid) => {
  try {
    return instance({
      method: "DELETE",
      url: `/api/lecture/delete-lecture/${lid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetLectureById = async (lid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/lecture/get-lecture/${lid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

