const couple = require("../models/CoupleModel")
const memoryType = require("../models/memoryTypeModel")

const getMemoryType = async (req, res) => {
  try {
    
    const { userLoveId } = req.query
    
    const userId = req.user._id

    if (!userId && !userLoveId) {
      return res.status(400).json({ error: "Cần cung cấp userId và userLoveId" })
    }

    const existingCouple = await couple.findOne({
        $or: [
          { userId: userId, userLoveId: userLoveId },
          { userId: userLoveId, userLoveId: userId }
        ]
    })

    if (!existingCouple) {
      return res.status(404).json({ error: "Không tìm thấy couple" });
    }
       
    const memory = await memoryType.find({coupleId: existingCouple.id})

    if (memory.length === 0) {
      return res.status(404).json({ error: "Chưa có album nào" })
    }

    return res.status(200).json(memory)
  } catch (error) {
    console.error("Error in getMemoryType controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getMemoryType }