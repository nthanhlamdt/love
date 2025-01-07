const couple = require('../models/coupleModel')
const { getReceiverSocketId, io } = require("../socket/socket")
const newLocal = '../models/chatModel'
const chat = require(newLocal)

const getMessage = async (req, res) => {
  try {
    const userId = req.user._id

    if (!userId) {
      return res.status(400).json({ error: 'Cần cung cấp userId' })
    }

    const userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    })
    
    if (!userStatusPending) return res.status(404).json({ error: 'Người dùng chưa kết nối!' })
    const savedMessage = await chat.find({ coupleId: userStatusPending._id }).sort({ createdAt: -1 })

    // console.log(savedMessage)
    return res.status(201).json(savedMessage)
  } catch (error) {
    console.error('Error in getMessage controller:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const sendMessage = async (req, res) => {
  try {
    const userId = req.user._id
    const { message } = req.body

    console.log(message)

    if (!userId) {
      return res.status(400).json({ error: 'Cần cung cấp userId' })
    }

    const userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    })
    
    if (!userStatusPending) return res.status(404).json({ error: 'Người dùng chưa kết nối!' })
    
    const newMessage = new chat({
      coupleId: userStatusPending._id,
      sendId: userId,
      message
    })

    const receiverSocketId = getReceiverSocketId(userStatusPending.userId == userId ? userStatusPending.userLoveId : userStatusPending.userId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }
    const savedMessage = await newMessage.save()

    return res.status(201).json(savedMessage)
  } catch (error) {
    console.error('Error in sendMessage controller:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateMessagesStatusToReaded = async (req, res) => {
  try {
    const userId = req.user._id

    if (!userId) {
      return res.status(400).json({ error: 'Cần cung cấp userId' })
    }

    // Lấy coupleId của cặp đôi mà user này thuộc về
    const userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    })
    
    if (!userStatusPending) return res.status(404).json({ error: 'Người dùng chưa kết nối!' })

    // Cập nhật tất cả tin nhắn của couple thành "readed"
    const updatedMessages = await chat.updateMany(
      { coupleId: userStatusPending._id, status: { $ne: 'readed' } }, // Chỉ cập nhật những tin nhắn chưa được đánh dấu là 'readed'
      { $set: { status: 'readed' } }
    )

    if (updatedMessages.modifiedCount > 0) {
      return res.status(200).json({ message: 'Cập nhật thành công tất cả tin nhắn thành "readed"' })
    } else {
      return res.status(404).json({ message: 'Không có tin nhắn nào cần cập nhật' })
    }
    
  } catch (error) {
    console.error('Error in updateMessagesStatusToReaded controller:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}


module.exports = { getMessage, sendMessage, updateMessagesStatusToReaded }