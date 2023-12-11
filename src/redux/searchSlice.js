import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: null,
  },
  reducers: {
    setResults: (state, action) => {
      return { ...state, results: action.payload };
    },
  },
});

export const { setResults } = searchSlice.actions;

//   export const selectResults = (state) => state.search.results;

export default searchSlice.reducer;
