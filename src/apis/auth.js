import instance from 'axiosConfig';

export const apiRegister = async (data) => {
  try {
    return instance({
      method: 'POST',
      url: '/api/auth/register-staff',
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiLogin = async (data) => {
  try {
    return instance({
      method: 'POST',
      url: '/api/auth/login',
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiLoginManager = async (data) => {
  try {
    return instance({
      method: 'POST',
      url: '/api/auth/login-manager',
      data: data
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiGetCurrent = async () => {
  try {
    return instance({
      method: 'GET',
      url: '/api/user/get-current-user'
    });
  } catch (error) {
    console.error(error);
  }
};
