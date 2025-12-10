import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated:false
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (_, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        setTimeout(() => {
          console.log("Hiiiiiii login");
          resolve("");
        }, 5000);
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login = false;
        state.error = action.payload.message;
      });
  },
});

export default userSlice.reducer;
