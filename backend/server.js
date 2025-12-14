import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import connectDb from "./db/index.js";
import userRouter from "./routes/user.js"
import messageRouter from "./routes/message.js"
import { errorMiddleware } from "./middleware/error.js";
import {app,server} from "./socket/socket.js"

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser());
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(
        `Server is connected at port : ${process.env.PORT} and Database is connected`
      );
    });
  })
  .catch((error) => {
    console.log("MongoDb connection failed !!", err);
  });

app.get("/", (req, res) => {
  res.send("Hii voyger");
});
app.use('/api/v1/users',userRouter)
app.use('/api/v1/message',messageRouter)
app.use(errorMiddleware)