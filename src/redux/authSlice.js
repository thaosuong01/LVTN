import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
    accessToken: localStorage.getItem('access_token') ?? "",
  },

  reducers: {
    login: (state, action) => {
      return { ...state, auth: action.payload };
    },
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
  },
});

export const { login, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
