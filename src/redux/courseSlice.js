import { createSlice } from "@reduxjs/toolkit";

function getIsEditMode() {
  const isEditMode = localStorage.getItem("editingMode");
  if (isEditMode) return isEditMode === "true";
  return false;
}

function setISEditMode(boolean) {
  localStorage.setItem("editingMode", JSON.stringify(boolean));
}

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    isEditMode: getIsEditMode(),
    course: null,
  },

  reducers: {
    getCourseByDepartment: (state, action) => {
      return { ...state, user: action.payload };
    },
    toggleEditMode: (state) => {
      setISEditMode(!state.isEditMode);
      state.isEditMode = !state.isEditMode;
    },
  },
});

export const { getCourseByDepartment, toggleEditMode } = courseSlice.actions;
export default courseSlice.reducer;
