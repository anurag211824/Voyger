import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../utility/api";
const initialState = {
  messages: [],
  loading: false,
  error: null,
};
export const getMessage = createAsyncThunk(
  "message/getMessage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/message/chat-message?receiverId=${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (messageData, { rejectWithValue }) => {
    try {
        console.log(messageData);
        
      const response = await API.post(`/message/send`,messageData);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addSocketMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addMessage: (state, action) => {
      // Add incoming message to the messages array
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
      
        if (action.payload) {
          state.messages.push(action.payload);
        }
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { addSocketMessage, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
