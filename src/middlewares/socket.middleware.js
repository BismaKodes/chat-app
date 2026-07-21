//  purpose is who is allowed to use socket connection and who is not allowed to use socket connection

import jwt from "jsonwebtoken";

export const socketAuth = (socket, next) => {
  try {

    console.log("Handshake auth:", socket.handshake.auth);

    const token = socket.handshake.auth.token;

  
  if (!token) {
    return next(new Error("Authentication required"));
  }

    // If token exists — verify it
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    socket.user = decoded;
    socket.userId = decoded.id;
    next();

  } catch (error) {
    console.log("JWT error:", error.message);
    next(new Error("Authentication error"));
  }
};