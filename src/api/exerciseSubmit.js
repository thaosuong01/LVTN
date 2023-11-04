import instance from "../axiosSetup";

export const apiCreateExerciseSubmit = async (data) => {
  return instance({
    method: "POST",
    url: "/api/exercise-submit/create",
    data,
    headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
  });
};

export const apiGetAllExerciseSubmitByExerciseId = async (eid) => {
  return instance({
    method: "GET",
    url: `/api/exercise-submit/get-by-exercise-id/${eid}`,
  });
};

export const apiGetExerciseSubmitByStudentId = async (sid) => {
  return instance({
    method: "GET",
    url: `/api/exercise-submit/get-by-student-id/${sid}`,
  });
};

export const apiUpdateExerciseSubmitById = async (eid, data) => {
  return instance({
    method: "PUT",
    url: `/api/exercise-submit/update/${eid}`,
    data,
  });
};
