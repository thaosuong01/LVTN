import instance from "../axiosSetup.js";

export const apiCreateExamSet = async (data) => {
  try {
    return instance({
      method: "POST",
      url: `/api/exam-set/create`,
      data
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiUpdateExamSet = async (id,data) => {
  try {
    return instance({
      method: "PUT",
      url: `/api/exam-set/update/${id}`,
      data
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteExam = async (id) => {
  try {
    return instance({
      method: "DELETE",
      url: `/api/exam-set/delete/${id}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetAllExamSet = async () => {
  try {
    return instance({
      method: "GET",
      url: `/api/exam-set/get-all`,
    });
  } catch (error) {
    console.log('error: ', error);
    
  }
}

export const apiGetExamSetByClassId = async (class_id) => {
  try {
    return instance({
      method: "GET",
      url: `/api/exam-set/get-by-class/${class_id}`,
    });
  } catch (error) {
    console.log('error: ', error);
    
  }
}

export const apiGetExamSetById = async (exam_id) => {
  try {
    return instance({
      method: "GET",
      url: `/api/exam-set/get-by-id/${exam_id}`,
    });
  } catch (error) {
    console.log('error: ', error);
    
  }
}