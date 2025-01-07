const Notification = require("../models/notificationsModel")
const User = require('../models/userModel')
const mongoose = require('mongoose')
const { getReceiverSocketId, io } = require("../socket/socket")

const sendNotification = async (req, res) => {
  
  try {
    let senderId = req.user._id;
    if (typeof senderId === 'string') {
      senderId =  new mongoose.Types.ObjectId(senderId);
    }

    const { phoneNumber, message, type, title, loveDate, albumId } = req.body;

    const receiver = await User.findOne({ phoneNumber }).select('_id');
    if (!receiver) return res.status(400).json({ error: 'Số điện thoại không hợp lệ!' });

    const receiverId = receiver._id;
    if (typeof receiverId === 'string') {
      receiverId = new mongoose.Types.ObjectId(receiverId);
    }

    if (senderId.equals(receiverId)) {
      return res.status(400).json({ error: 'Không thể gửi yêu cầu cho chính bạn' });
    }

    const newNotification = new Notification({
      senderId,
      receiverId,
      message: message,
      type: type,
      title: title,
      loveDate: loveDate,
      albumId: albumId
    });

    const noticationSave = await newNotification.save()
    
    const senderInfo = await User.findOne({ _id: senderId })
    
    const newNotificationFull = {
      ...noticationSave.toObject(),
      albumId: albumId,
      senderId: {
        _id: senderInfo._id,
        avatar: senderInfo.avatar,
        fullName: senderInfo.fullName
      }
    }

    const receiverSocketId = getReceiverSocketId(receiverId)
    console.log("User id của người dùng lấy thông báo: ", receiverId)
    console.log("Socket id của người dùng lấy thông báo: ", receiverSocketId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newNotification', newNotificationFull);
    }

    res.status(201).json({ message: 'Đã thông báo thành công!' });
  } catch (error) {
    console.error('Error in sendNotification controller:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getNotification = async (req, res) => {
  try {
    const receiverId = req.user._id;

    const notifications = await Notification.find({ receiverId })
      .populate('senderId', 'avatar fullName').sort({ createAt: -1 })

    if (notifications.length === 0) {
      return res.status(404).json({ message: 'Không có thông báo nào' });
    }

    const quanlityNotification = await Notification.countDocuments({ receiverId, status: 'unread' })

    res.status(200).json({
      notifications,
      quanlityNotification
     });
  } catch (error) {
    console.error('Error in getNotification controller:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const readingSend = async (req, res) => {
  try {
    const { idNotification, status } = req.body
    if (!['pending', 'unread', 'read', 'see'].includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ.' })
    }

    // Cập nhật trạng thái của thông báo
    const notification = await Notification.findByIdAndUpdate(
      idNotification,
      { status },
      { new: true } // Trả về thông báo đã cập nhật
    )
    

    if (!notification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo.' })
    }

    res.status(200).json(notification)
  } catch (error) {
    console.error("Error in readingSend controller:", error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = { sendNotification, getNotification, readingSend }