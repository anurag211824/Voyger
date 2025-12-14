import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme";
import userReducer from "./slices/user";
import messageReducer from "./slices/message";


export const store = configureStore({
  reducer: {
    theme:themeReducer,
    user:userReducer,
    message:messageReducer,
  },
});

export default store;
