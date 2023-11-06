import instance from 'axiosConfig';

export const apiGetListClass = async () => {
  try {
    return instance({
      method: 'GET',
      url: '/api/class/'
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteClass = async (id) => {
  try {
    return instance({
      method: 'DELETE',
      url: `/api/class/delete-class/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};
