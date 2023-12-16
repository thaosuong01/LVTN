import instance from 'axiosConfig';

export const apiGetListDepartment = async () => {
  try {
    return instance({
      method: 'GET',
      url: '/api/department/'
    });
  } catch (error) {
    console.log(error);
  }
};

// create department
export const apiCreateDepartment = async (data) => {
  try {
    return instance({
      method: 'POST',
      url: '/api/department/create',
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

// update department by id
export const apiUpdateDepartmentById = async (id, data) => {
  try {
    return instance({
      method: 'PUT',
      url: `/api/department/update/${id}`,
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

// get department by id
export const apiGetDepartmentById = async (id) => {
  try {
    return instance({
      method: 'GET',
      url: `/api/department/get-department/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteDepartment = async (id) => {
  try {
    return instance({
      method: 'DELETE',
      url: `/api/department/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};


export const apiRemoveDepartment = async (id) => {
  try {
    return instance({
      method: 'PUT',
      url: `/api/department/remove-department/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};