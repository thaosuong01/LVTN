import instance from "../axiosSetup.js";

export const apiUpdateExamResult = async (data) => {
  try {
    return instance({
      method: "PUT",
      url: `/api/exam-result/update`,
      data
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetExamResult = async (user_id,exam_set_id) => {
  try {
    return instance({
      method: "GET",
      url: `/api/exam-result/?user_id=${user_id}&exam_set_id=${exam_set_id}`,
    });
  } catch (error) {
    console.log(error);
  }
}

export const apiGetAllExamResult = async () => {
  try {
    return instance({
      method: "GET",
      url: `/api/exam-result/get-all`,
    });
  } catch (error) {
    console.log(error);
  }
}