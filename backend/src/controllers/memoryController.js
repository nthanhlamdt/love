const { mongoose } = require("mongoose")
const couple = require("../models/CoupleModel")
const memory = require("../models/memoryModel")
const yearlyMemory = require("../models/yearlyMemoryModel")

const createMemory = async (req, res) => {
  try {
    const { date, name, userLoveId, description, memoryType } = req.body
    const userId = req.user._id

    // Kiểm tra xem tất cả các tham số cần thiết có tồn tại không
    if (!date || !name || !userLoveId || !memoryType || !req.file) {
      return res.status(400).json({ error: 'Cần cung cấp tất cả các trường bắt buộc, bao gồm ảnh.' })
    }

    // Chuyển đổi chuỗi ngày từ "dd-mm-yyyy" thành đối tượng Date hợp lệ
    const dateParts = date.split('-') // Tách ngày, tháng, năm
    if (dateParts.length !== 3) {
      return res.status(400).json({ error: 'Ngày không hợp lệ, vui lòng kiểm tra định dạng' })
    }

    // Xử lý ngày theo định dạng dd-mm-yyyy -> tạo đối tượng Date (yyyy-mm-dd)
    const dateMemory = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)

    // Kiểm tra tính hợp lệ của date
    if (isNaN(dateMemory.getTime())) {
      return res.status(400).json({ error: 'Ngày không hợp lệ' })
    }

    // Kiểm tra cặp đôi hợp lệ
    const existingCouple = await couple.findOne({
      $or: [
        { userId: userId, userLoveId: userLoveId },
        { userId: userLoveId, userLoveId: userId }
      ]
    })

    if (!existingCouple) {
      return res.status(401).json({ message: "Cặp đôi không hợp lệ" })
    }

    // Lấy thông tin ảnh từ req.file
    let imageUrl = req.file.path
    if (!imageUrl) {
      return res.status(400).json({ error: "Vui lòng thêm ảnh kỉ niệm" })
    }

    // Tạo mới một bộ nhớ
    const newMemory = new memory({
      date: dateMemory,
      coupleId: existingCouple._id,
      memoryType,
    })
    const savedMemory = await newMemory.save()
    
    const newYearlyMemory = new yearlyMemory({
      memoryId: savedMemory._id,
      year: dateParts[2],
      name,
      description,
      image: imageUrl,
      userId
    })

    await newYearlyMemory.save()

    // Lưu vào cơ sở dữ liệu
    

    // Trả về kết quả
    return res.status(201).json(savedMemory)
  } catch (error) {
    console.error('Lỗi khi tạo memory:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}


const getMemoryToMonth = async (req, res) => {
  try {
    const { userLoveId, month, year } = req.query
    const userId = req.user._id
    const monthNumber = Number(month)
    const yearNumber = Number(year)
    // Kiểm tra xem tất cả các tham số cần thiết có tồn tại không
    if (!userLoveId || monthNumber === undefined || monthNumber === undefined) {
      return res.status(400).json({ error: 'userLoveId, month và year là bắt buộc' })
    }

    // Kiểm tra tính hợp lệ của tháng (1 - 12) và năm (năm hợp lệ)
    if (typeof monthNumber !== 'number' || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: 'Tháng không hợp lệ. Phải từ 1 đến 12.' })
    }

    if (typeof yearNumber !== 'number' || yearNumber < 1900 || yearNumber > new Date().getFullYear()) {
      return res.status(400).json({ error: 'Năm không hợp lệ.' })
    }

    const existingCouple = await couple.findOne({
      $or: [
        { userId: userId, userLoveId: userLoveId },
        { userId: userLoveId, userLoveId: userId }
      ]
    })

    if (!existingCouple) {
      return res.status(401).json({ message: "Cặp đôi không hợp lệ" })
    }

    const savedMemory = await memory.find({
      coupleId: existingCouple._id,  // Điều kiện tìm theo coupleId
    }).populate('memoryType');

    // Sau khi lấy dữ liệu, lọc theo tháng
    const filteredMemory = savedMemory.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() + 1 === monthNumber; // Chỉ so sánh tháng
    });

    return res.status(200).json(filteredMemory)
  } catch (error) {
    console.error('Error in getMemory controller:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getYearlyMemory = async (req, res) => {
  try {
    const { memoryId } = req.query;

    if (!memoryId) {
      return res.status(400).json({ error: 'memoryId là bắt buộc' });
    }

    if (!mongoose.Types.ObjectId.isValid(memoryId)) {
      return res.status(400).json({ error: 'memoryId không hợp lệ' });
    }

    const savedYearlyMemory = await yearlyMemory.find({ memoryId })
      .populate('memoryId')
      .populate('userId')
      .sort({ year: 1 });     // Sắp xếp theo năm (1: tăng dần, -1: giảm dần)

    if (!savedYearlyMemory.length) {
      return res.status(404).json({ error: 'Không tìm thấy dữ liệu cho memoryId này' });
    }

    return res.status(200).json(savedYearlyMemory);

  } catch (error) {
    console.error('Lỗi trong controller getYearlyMemory:', error.message);
    return res.status(500).json({ error: 'Lỗi hệ thống' });
  }
}

const createYearlyMemory = async (req, res) => {
  try {
    const { year, name, memoryId, description } = req.body
    const userId = req.user._id
    
    // Kiểm tra xem tất cả các tham số cần thiết có tồn tại không
    if (!year || !name || !memoryId || !description || !req.file) {
      return res.status(400).json({ error: 'Cần cung cấp tất cả các trường bắt buộc, bao gồm ảnh.' })
    }

    let imageUrl = req.file.path

    if (!imageUrl) {
      return res.status(400).json({ error: "Vui lòng thêm ảnh kỉ niệm" })
    }
    
    const newYearlyMemory = new yearlyMemory({
      memoryId,
      year,
      name,
      description,
      image: imageUrl,
      userId
    })

    await newYearlyMemory.save()

    // Trả về kết quả
    return res.status(201).json(newYearlyMemory)
  } catch (error) {
    console.error('Lỗi khi tạo createYearlyMemory:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}



module.exports = { createMemory, getMemoryToMonth, getYearlyMemory, createYearlyMemory }