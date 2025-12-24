import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import connectDb from "./db/index.js";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js";
import { errorMiddleware } from "./middleware/error.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

connectDb()
  .then(() => {
    server.listen(process.env.PORT || 9000, () => {
      console.log(
        `Server is connected at port : ${process.env.PORT} and Database is running`
      );
    });
  })
  .catch((error) => {
    console.log("MongoDb connection failed !!", error);
  });
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // 1️⃣ Join user room
  socket.on("join", (userId) => {
    socket.join(userId);
    socket.userId = userId; // Store userId in socket for reference
    console.log(`User ${userId} joined room with socket ${socket.id}`);
  });

  // 2️⃣ Receive message from sender
  socket.on("sendMessage", (messageData) => {
    const { receiverId, senderId } = messageData;
    console.log(`Message from ${senderId} to ${receiverId}:`, messageData);

    // Send message to receiver
    socket.to(receiverId).emit("receiveMessage", messageData);
    
    // Also send confirmation back to sender if needed
    console.log(`Message sent to user ${receiverId}`);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.userId || 'unknown'} disconnected: ${socket.id}`);
  });
});
app.get("/", (req, res) => {
  res.send("Hii voyger");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/message", messageRouter);
app.use(errorMiddleware);
