import express from "express";
import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import { addUser, getSocket, removeUser } from "./src/utils/socketManager.js";
import { initChatSocket } from "./src/sockets/chat.socket.js";
import connectDb from "./src/db/db.js";
import dotenv from "dotenv"
dotenv.config()

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// 🔹 Connect socket logic
initChatSocket(io);



// ✅ Connect DB and start server
const portnum = process.env.PORT || 3030
connectDb()
  .then(() => {
    server.listen(portnum, () => {
      console.log(`server is running at port ${portnum}`)
    })
  })
  .catch((err) => {
    console.log("MONGODB connection failed", err)
  })