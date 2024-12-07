// socket/socket.js

const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'], // Chỉnh sửa với địa chỉ frontend của bạn
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // {userId: socketId}

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("Đã có người dùng kết nối: ", socket.id);

  // Đăng ký người dùng khi họ kết nối
  socket.on("register", (userId) => {
    userSocketMap[userId] = socket.id;
    console.log("Đã đăng ký người dùng: ", userId, "với socket ID:", socket.id);
  });

  // Lắng nghe sự kiện "disconnect" để xóa người dùng khỏi userSocketMap
  socket.on("disconnect", () => {
    console.log("Người dùng đã ngắt kết nối: ", socket.id);
    // Tìm userId từ socketId và xóa khỏi userSocketMap
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
