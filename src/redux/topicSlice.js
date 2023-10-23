import { createSlice } from "@reduxjs/toolkit";

export const topicSlice = createSlice({
  name: "topics",
  initialState: {
    topics: null,
    types: null,
  },

  reducers: {
    setTopic: (state, action) => {
      return { ...state, topics: action.payload };
    },
    setType: (state, action) => {
      return { ...state, types: action.payload };
    },
  },
});

export const { setTopic, setType } = topicSlice.actions;
export default topicSlice.reducer;
