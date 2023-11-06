import { apiGetCurrent } from 'apis/auth';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getMe = createAsyncThunk('user/getMe', async () => {
  const currentUser = await apiGetCurrent();

  return currentUser.data;
});

const user = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: ''
  },

  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload
      };
    },
    clearUser: (state) => {
      return {
        ...state,
        user: null
      };
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      });
  }
});

export default user.reducer;

export const { setUser, clearUser } = user.actions;
