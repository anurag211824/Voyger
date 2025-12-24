import { io } from "socket.io-client";
import {useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "./SocketContext";


const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { user } = useSelector((state) => state.user);
  const isConnected = useRef(false);

  useEffect(() => {
    if (!user?._id || isConnected.current) return;

    socket.current = io(import.meta.env.VITE_BACKEND_DB, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.id);
      isConnected.current = true;
      
      // Join user room
      socket.current.emit("join", user._id);
    });

    socket.current.on("disconnect", () => {
      console.log("Socket disconnected");
      isConnected.current = false;
    });

    socket.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        isConnected.current = false;
      }
    };
  }, [user?._id]);

  // 🔹 Emit message
  const sendSocketMessage = (data) => {
    if (socket.current?.connected) {
      socket.current.emit("sendMessage", data);
      console.log("Message sent via socket:", data);
    } else {
      console.error("Socket not connected");
    }
  };

  // 🔹 Listen message
  const onReceiveMessage = (callback) => {
    if (socket.current) {
      socket.current.on("receiveMessage", callback);
    }
  };

  const offReceiveMessage = () => {
    if (socket.current) {
      socket.current.off("receiveMessage");
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, sendSocketMessage, onReceiveMessage, offReceiveMessage }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
