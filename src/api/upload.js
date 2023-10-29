import instance from "../axiosSetup.js";

export const uploadDocument = async (data) => {
  return await instance({
    method: "POST",
    url: "/api/upload/document",
    data: data,
    headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
  });
};

export const apiGetDocumentById = async (did) => {
  try {
    return instance({
      method: "GET",
      url: `/api/upload/document/${did}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetFilesByDocumentId = async (did) => {
  try {
    return instance({
      method: "GET",
      url: `/api/upload/file/${did}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetDocByClassId = async (cid) => {
  try {
    return instance({
      method: "GET",
      url: `/api/upload/document-by-class-id/${cid}`,
    });
  } catch (error) {
    console.log(error);
  }
};

// api update document by id
export const apiUpdateDocumentById = async (did, data) => {
  try {
    return instance({
      method: "PUT",
      url: `/api/upload/update-document/${did}`,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

// api delete document by id
export const apiDeleteDocumentById = async (did) => {
  try {
    return instance({
      method: "DELETE",
      url: `/api/upload/delete-document/${did}`,
    });
  } catch (error) {
    console.log(error);
  }
};
