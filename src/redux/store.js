import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import departmentSlice from "./departmentSlice";
import courseSlice from "./courseSlice";
import topicSlice from "./topicSlice";
import classSlice from "./classSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  department: departmentSlice,
  course: courseSlice,
  topic: topicSlice,
  class: classSlice,
});

export default configureStore({ reducer: rootReducer });
