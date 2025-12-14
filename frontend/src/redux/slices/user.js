import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../utility/api";
import toast from "react-hot-toast";
const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  otherUsers: [],
  getOtherUserloading: false,
  currentChatUser:JSON.parse(localStorage.getItem("currentChatUser")) || null,
};
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/users/register", formData);
      toast.success("Registrated successfully");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/users/login", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const otherUser = createAsyncThunk(
  "user/otherUsers",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.get("/users/other-users", formData);
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
   
      const response = await API.get("/users/get-user");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (_, { rejectWithValue }) => {
    try {
   
      const response = await API.post("/users/logout");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentChatUser: (state, action) => {
      localStorage.setItem("currentChatUser", JSON.stringify(action.payload.currentChattingUser));
      state.currentChatUser = action.payload.currentChattingUser;
      console.log(state.currentChatUser);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.login = false;
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(otherUser.pending, (state) => {
        state.getOtherUserloading = true;
      })
      .addCase(otherUser.fulfilled, (state, action) => {
        state.getOtherUserloading = false;
        state.otherUsers = action.payload;
       
      })
      .addCase(otherUser.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setCurrentChatUser } = userSlice.actions;
export default userSlice.reducer;
