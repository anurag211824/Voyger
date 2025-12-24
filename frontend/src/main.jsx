import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "../src/redux/store.js";
import { Provider } from "react-redux";
import SocketProvider from "./socket/SocketProvider.jsx";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketProvider><App /></SocketProvider>
      
  
  </Provider>
);
