import { createSlice } from "@reduxjs/toolkit";

export const classSlice = createSlice({
  name: "classes",
  initialState: {
    classes: null,
  },

  reducers: {
    setClass: (state, action) => {
      return { ...state, classes: action.payload };
    },
  },
});

export const { setClass } = classSlice.actions;
export default classSlice.reducer;
