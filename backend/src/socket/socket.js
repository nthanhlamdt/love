// socket/socket.js

const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://love-fontend.onrender.com'], // Chỉnh sửa với địa chỉ frontend của bạn
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // {userId: socketId}

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  // Đăng ký người dùng khi họ kết nối
  socket.on("register", (userId) => {
    userSocketMap[userId] = socket.id;
    console.log("Đã đăng ký người dùng: ", userId, "với socket ID:", socket.id);
  });

  socket.on("disconnect", () => {
    for (let userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        console.log("Đã xóa người dùng khỏi map: ", userId);
        break;
      }
    }
  });

  // Các sự kiện khác có thể được xử lý ở đây
  // Ví dụ gửi tin nhắn từ A tới B
  socket.on('send_message', (data) => {
    const { to, message } = data;
    const receiverSocketId = getReceiverSocketId(to);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_message', message);
    } else {
      console.log("Không tìm thấy socket của người nhận:", to);
    }
  });
});

// Khởi động server
module.exports = { app, io, server, getReceiverSocketId };
