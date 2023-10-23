import instance from "../axiosSetup.js";

export const apiGetCurrentUser = async () => {
  try {
    return instance({
      method: "GET",
      url: "/api/user/get-current-user",
    });
  } catch (error) {
    console.log(error);
  }
};
