const couple = require("../models/coupleModel");
const Celebrate = require("../models/celebrateModel");

const getCelebrate = async (req, res) => {
  try {
    const userId = req.user._id;
    const userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    });
    
    if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})

    // Truy vấn celebrate dựa trên coupleId của cặp đôi
    const celebrations = await Celebrate.findOne({ coupleId: userStatusPending._id });

    // Nếu không có sự kiện celebrate nào, trả về lỗi
    if (!celebrations || celebrations.length === 0) {
      return res.status(404).json({ message: "Không có dữ liệu celebrate" });
    }

    return res.status(201).json(celebrations); // Trả về dữ liệu celebrate
  } catch (error) {
    console.error("Error in getCelebrate controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const updateCelebrate = async (req, res) => {
  try {
    const { type, text } = req.body;
    const image = req.file?.path; // Lấy đường dẫn ảnh nếu tồn tại
    const userId = req.user._id;

    const userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    });
    
    if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})

    // Tìm sự kiện celebrate
    const celebrations = await Celebrate.findOne({ coupleId: userStatusPending._id });

    if (!celebrations) {
      return res.status(404).json({ message: "Không có dữ liệu celebrate" });
    }
    
    // Chuẩn bị trường cần cập nhật
    const updateFields = {};
    
    if (type == 1) {
      
      if (image) updateFields.image1 = image;
      if (text) updateFields.text1 = text;
    } else if (type == 2) {
      if (image) updateFields.image2 = image;
      if (text) updateFields.text2 = text;
    } else if (type == 3) {
      if (image) updateFields.image3 = image;
      if (text) updateFields.text3 = text;
    } else if (type == 4) {
      if (image) updateFields.image4 = image;
      if (text) updateFields.text4 = text;
    } else {
      
      return res.status(400).json({ message: "Loại cập nhật không hợp lệ" });
    }

    
    // Cập nhật sự kiện
    const updatedCelebrate = await Celebrate.findOneAndUpdate(
      { coupleId: userStatusPending._id }, // Điều kiện tìm kiếm
      { $set: updateFields },          // Dữ liệu cần cập nhật
      { new: true }                    // Trả về tài liệu đã cập nhật
    );

    if (!updatedCelebrate) {
      return res.status(404).json({ message: "Không tìm thấy tài nguyên!" });
    }

    res.status(201).json(updatedCelebrate);
  } catch (error) {
    console.error("Error in updateCelebrate controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { getCelebrate, updateCelebrate };
