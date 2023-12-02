import instance from 'axiosConfig';

export const apiUpdateProfileUser = async (data) => {
  try {
    return instance({
      method: 'PUT',
      url: '/api/user/current',
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

// update user by id
export const apiUpdateUserById = async (id, data) => {
  try {
    return instance({
      method: 'PUT',
      url: `/api/user/update-user/${id}`,
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

// get list user
export const apiGetListUser = async () => {
  try {
    return instance({
      method: 'GET',
      url: '/api/user/get-all'
    });
  } catch (error) {
    console.log(error);
  }
};

// get user by id
export const apiGetUserById = async (id) => {
  try {
    return instance({
      method: 'GET',
      url: `/api/user/get-user/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteUser = async (id) => {
  try {
    return instance({
      method: 'DELETE',
      url: `/api/user/delete-user/${id}`
    });
  } catch (error) {
    console.log(error);
  }
};

// create user
export const apiCreateUser = async (data) => {
  try {
    return instance({
      method: 'POST',
      url: '/api/auth/create',
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

// create many student
export const apiCreateManyStudent = (data) => {
  try {
    return instance({
      method: 'POST',
      url: '/api/user/create-many-student',
      data
    });
  } catch (error) {
    console.log(error);
  }
};
