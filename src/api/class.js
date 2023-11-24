import instance from "../axiosSetup.js";

export const apiGetClass = async (cid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/class/get-class-in-course/${cid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetClassCreatedByOwner = async () => {
  try {
    return instance({
      method: "GET",
      url: `/api/class/get-class-created-by-owner/`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetClassById = async (cid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/class/get-class/${cid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiAddClass = async (data) => {
  try {
    return instance({
      method: "POST",
      url: `/api/class/create`,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiUpdateClass = async (data, cid) => {
  try {
    return instance({
      method: "PUT",
      url: `/api/class/update-class/${cid}`,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteClass = async (id) => {
  return instance({
    method: "DELETE",
    url: `/api/class/delete-class/${id}`,
  });
};
