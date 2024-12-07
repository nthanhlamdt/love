const Notification = require("../models/NotificationsModel")
const User = require('../models/userModel')
const { findById } = require("../models/userModel")
const mongoose = require('mongoose')

const sendNotification = async (req, res) => {
  try {
    const sendId = new mongoose.Types.ObjectId(req.user._id)
    const { phoneNumber, dateLove, message, title } = req.body
    
    if (!phoneNumber || !dateLove || !message || !title) return res.status(500).json({ error: "Thông tin không đủ" })
    
    const userId = await User.findOne({ phoneNumber }).select('_id')

    if (!userId) return res.status(500).json({error: "Số điện thoại không tồn tại"})

    if (sendId.equals(userId._id)) return res.status(500).json({ error: "Không thể gửi yêu cầu cho chính bạn" })
    const listSend = await Notification.find({ sendId, userId })
    console.log(listSend)
    const hasPendingRequests = listSend.filter((data) => {
      return data !== null && data !== undefined && data.status !== 'Pending';
    })

    

    if (hasPendingRequests.length !== 0) {
        return res.status(500).json({ error: "Đã gửi yêu cầu trước đó" });
    }
    
    const date = new Date(dateLove)
    const notification = new Notification({
      userId,
      sendId,
      message,
      title,
      dateLove: date
    })
    notification.save()
    res.status(200).send('đã thông báo')
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const getNotification = async (req, res) => {
  try {
    const userId = req.user._id
    
    // Fetch notifications for the user
    const notifications = await Notification.find({ userId })
    
    // Fetch user information for each notification asynchronously
    const dataNotification = await Promise.all(notifications.map(async (noti) => {
      const infoSendUser = await User.findOne({ _id: noti.sendId })
      return {
        ...noti.toObject(), // Convert Mongoose document to plain object
        avatarSend: infoSendUser ? infoSendUser.avatar : null,
        FullName: infoSendUser.fullName
      }
    }))
    
    res.status(200).json(dataNotification)
  } catch (error) {
    console.error("Error fetching notifications:", error) // Added error logging for debugging
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const readingSend = async (req, res) => {
  try {
    const { idNotification } = req.body;
    const notification = await Notification.findOne({ _id: idNotification });

    if (!notification) {
      return res.status(404).json({ error: 'Thông báo không tìm thấy' });
    }

    const newStatus = notification.status === 'Sent' ? 'read' : notification.status;

    await Notification.findOneAndUpdate(
      { _id: idNotification },
      { status: newStatus },
      { new: true } // Để trả về tài liệu đã được cập nhật
    );

    res.status(200).json({ message: 'Đã cập nhật' });
  } catch (error) {
    console.error('Error updating notification status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { sendNotification, getNotification, readingSend }