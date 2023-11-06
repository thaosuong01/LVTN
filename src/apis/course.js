import instance from 'axiosConfig';

export const apiGetListCourse = async () => {
  try {
    return instance({
      method: 'GET',
      url: '/api/course/'
    });
  } catch (error) {
    console.log(error);
  }
};

// create course
export const apiCreateCourse = async (data) => {
  try {
    return instance({
      method: 'POST',
      url: '/api/course/create',
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

// update course by id
export const apiUpdateCourseById = async (id, data) => {
  try {
    return instance({
      method: 'PUT',
      url: `/api/course/update/${id}`,
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

// get course by id
export const apiGetCourseById = async (id) => {
  try {
    return instance({
      method: 'GET',
      url: `/api/course/get-course/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteCourse = async (id) => {
  try {
    return instance({
      method: 'DELETE',
      url: `/api/course/delete/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};
