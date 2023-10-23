import instance from "../axiosSetup.js";

export const uploadDocument = async (data) => {
  return await instance({
    method: "POST",
    url: "/api/upload/document",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  });
};
