import instance from 'axiosConfig';

export const apiGetListDocument = async () => {
  try {
    return instance({
      method: 'GET',
      url: '/api/upload/get-document'
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetDocumentById = async (id) => {
  try {
    return instance({
      method: 'GET',
      url: `/api/upload/document/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteDocument = async (id) => {
  try {
    return instance({
      method: 'DELETE',
      url: `/api/upload/delete-document/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};
