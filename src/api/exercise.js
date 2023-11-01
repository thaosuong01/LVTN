import instance from "../axiosSetup";

export const apiCreateExercise = async (data) => {
  return instance({
    method: "POST",
    url: "/api/exercise/create",
    data,
    headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
  });
};

export const apiUpdateExerciseById = async (eid, data) => {
  return instance({
    method: "PUT",
    url: `/api/exercise/update-exercise/${eid}`,
    data,
  });
};

export const apiGetExerciseByClassId = async (cid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/exercise/get-exercise-by-class-id/${cid}`,
    });
  } catch (error) {
    console.log(error);
  }
};
export const apiGetExerciseById = async (eid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/exercise/get-exercise-by-id/${eid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteExerciseById = async (eid) => {
  try {
    return instance({
      method: "DELETE",
      url: `/api/exercise/delete-exercise/${eid}`,
    });
  } catch (error) {
    console.log(error);
  }
};
