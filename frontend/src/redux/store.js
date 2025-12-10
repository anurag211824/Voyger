import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme.js"
import userReducer from "./slices/user.js"
const store = configureStore({
 reducer:{
     theme:themeReducer,
     user:userReducer
 }
})

export default store;