import instance from 'axiosConfig';

export const apiGetListRole = async () => {
  try {
    return instance({
      method: 'GET',
      url: '/api/role/'
    });
  } catch (error) {
    console.log(error);
  }
};

// create role
export const apiCreateRole = async (data) => {
  try {
    return instance({
      method: 'POST',
      url: '/api/role/create',
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

// update role by id
export const apiUpdateRoleById = async (id, data) => {
  try {
    return instance({
      method: 'PUT',
      url: `/api/role/update/${id}`,
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

// get role by id
export const apiGetRoleById = async (id) => {
  try {
    return instance({
      method: 'GET',
      url: `/api/role/get-role/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteRole = async (id) => {
  try {
    return instance({
      method: 'DELETE',
      url: `/api/role/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};
