// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app"); // Your main Express app
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("new-message", (msg) => {
    console.log("Received msg:", msg);
    io.emit("newMessage", msg); 
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
