import instance from "../axiosSetup.js";

export const apiGetTopic = async () => {
  try {
    return instance({
      method: "GET",
      url: "/api/topic/",
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiCreateTopic = async (data) => {
  try {
    return instance({
      method: "POST",
      url: "/api/topic/create",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetTypeOfTopic = async () => {
  try {
    return instance({
      method: "GET",
      url: "/api/topic/get-type-of-topic/",
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetTopicById = async (tid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/topic/get-topic/${tid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteTopic = async (tid) => {
  try {
    return instance({
      method: "DELETE",
      url: `/api/topic/delete/${tid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetTopicByClass = async (cid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/topic/get-topic-by-class/${cid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiUpdateTopic = async (tid, data) => {
  try {
    return instance({
      method: "PUT",
      url: `/api/topic/update-topic/${tid}`,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
