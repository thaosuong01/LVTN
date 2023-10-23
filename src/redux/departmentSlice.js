import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    departments: null,
  },

  reducers: {
    setDepartment: (state, action) => {
      return { ...state, departments: action.payload };
    },
  },
});

export const { setDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
