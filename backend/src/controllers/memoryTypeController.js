const couple = require("../models/coupleModel")
const memoryType = require("../models/memoryTypeModel")

const getMemoryType = async (req, res) => {
  try {
    const userId = req.user._id

    if (!userId) {
      return res.status(400).json({ error: "Cần cung cấp userId và userLoveId" })
    }

    let userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    });
    
    if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})
       
    const memory = await memoryType.find({ coupleId: userStatusPending._id })

    if (memory.length === 0) {
      return res.status(404).json({ error: "Chưa có album nào" })
    }

    return res.status(200).json(memory)
  } catch (error) {
    console.error("Error in getMemoryType controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const createMemoryType = async (req, res) => {
  try {
    const { name, icon } = req.body
    const userId = req.user._id
    // Kiểm tra xem tất cả các tham số cần thiết có tồn tại không
    if (!icon || !name) {
      return res.status(400).json({ error: 'Cần cung cấp tất cả các trường bắt buộc.' })
    }

    let userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    });
    
    if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})
  
    // Tạo mới một bộ nhớ
    const newMemoryType = new memoryType({
      name,
      coupleId: userStatusPending._id,
      icon
    })
  
    const savedMemoryType = await newMemoryType.save()

    // Trả về kết quả
    return res.status(201).json(savedMemoryType)
  } catch (error) {
    console.error('Lỗi khi tạo createMemoryType:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { getMemoryType, createMemoryType }