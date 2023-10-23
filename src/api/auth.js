import instance from "../axiosSetup.js";

export const apiLogin = async (data) => {
  try {
    return instance({
      method: "POST",
      url: "/api/auth/login",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
