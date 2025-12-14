import dotenv from "dotenv";
dotenv.config();
import {Server} from "socket.io"
import http from "http";
import express from "express"

const app = express()

const server  = http.createServer(app)


const io = new Server(server,{
    cors:{
        origin:process.env.CORS_ORIGIN
    }
})
io.on("connection",(socket)=>{
    console.log("hii");
    
    console.log(socket.id)
})
export {io,app,server}