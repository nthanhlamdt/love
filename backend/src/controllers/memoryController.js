const { mongoose } = require("mongoose")
const couple = require("../models/coupleModel")
const memory = require("../models/memoryModel")
const yearlyMemory = require("../models/yearlyMemoryModel")

const createMemory = async (req, res) => {
  try {
    const { date, name, description, memoryType } = req.body
    const userId = req.user._id

    // Kiểm tra xem tất cả các tham số cần thiết có tồn tại không
    if (!date || !name || !memoryType || !req.file) {
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
    let userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    });
    
    if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})

    // Lấy thông tin ảnh từ req.file
    let imageUrl = req.file.path
    if (!imageUrl) {
      return res.status(400).json({ error: "Vui lòng thêm ảnh kỉ niệm" })
    }

    // Tạo mới một bộ nhớ
    const newMemory = new memory({
      date: dateMemory,
      coupleId: userStatusPending._id,
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

    return res.status(201).json(savedMemory)
  } catch (error) {
    console.error('Lỗi khi tạo memory:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}


const getMemoryToMonth = async (req, res) => {
  try {
    const { month } = req.query
    const userId = req.user._id
    const monthNumber = Number(month)

    // Kiểm tra xem tất cả các tham số cần thiết có tồn tại không
    if (!month) {
      return res.status(400).json({ error: 'userLoveId và month là bắt buộc' })
    }

    // Kiểm tra tính hợp lệ của tháng (1 - 12)
    if (typeof monthNumber !== 'number' || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: 'Tháng không hợp lệ. Phải từ 1 đến 12.' })
    }

    // Kiểm tra cặp đôi có tồn tại hay không
    let userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    });
    
    if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})

    // Tìm kiếm bộ nhớ của cặp đôi
    const savedMemory = await memory.find({
      coupleId: userStatusPending._id,  // Điều kiện tìm theo coupleId
    }).populate('memoryType')

    // Sau khi lấy dữ liệu, lọc theo tháng
    const filteredMemory = savedMemory.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate.getMonth() + 1 === monthNumber // So sánh chỉ tháng (tháng trong JavaScript từ 0 đến 11)
    })

    return res.status(200).json(filteredMemory)
  } catch (error) {
    console.error('Error in getMemory controller:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}


const getYearlyMemory = async (req, res) => {
  try {
    const { memoryId } = req.query

    if (!memoryId) {
      return res.status(400).json({ error: 'memoryId là bắt buộc' })
    }

    if (!mongoose.Types.ObjectId.isValid(memoryId)) {
      return res.status(400).json({ error: 'memoryId không hợp lệ' })
    }

    const savedYearlyMemory = await yearlyMemory.find({ memoryId })
      .populate('memoryId')
      .populate('userId')
      .sort({ year: 1 })     // Sắp xếp theo năm (1: tăng dần, -1: giảm dần)

    if (!savedYearlyMemory.length) {
      return res.status(404).json({ error: 'Không tìm thấy dữ liệu cho memoryId này' })
    }

    return res.status(200).json(savedYearlyMemory)

  } catch (error) {
    console.error('Lỗi trong controller getYearlyMemory:', error.message)
    return res.status(500).json({ error: 'Lỗi hệ thống' })
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

const getTimeMachine = async (req, res) => {
  try {
    const { userLoveId } = req.query
    const userId = req.user._id

    // Kiểm tra xem userLoveId có tồn tại không
    if (!userLoveId) {
      return res.status(400).json({ error: 'userLoveId là bắt buộc' })
    }

    // Kiểm tra cặp đôi có tồn tại không
    const existingCouple = await couple.findOne({
      $or: [
        { userId: userId, userLoveId: userLoveId },
        { userId: userLoveId, userLoveId: userId },
      ],
    })

    if (!existingCouple) {
      return res.status(401).json({ message: 'Cặp đôi không hợp lệ' })
    }

    // Lấy tất cả bộ nhớ của cặp đôi
    const memories = await memory.find({ coupleId: existingCouple._id })

    // Lấy dữ liệu time machine từ yearlyMemory và xử lý theo thời gian
    const savedTimeMachine = await Promise.all(
      memories.map(async (memory) => {
        const dataTimeMachine = await yearlyMemory.find({ memoryId: memory._id })
        const dateMemory = new Date(memory.date)

        // Đảm bảo năm hiện tại là từ memory.date hoặc một giá trị phù hợp
        const year = dateMemory.getFullYear() // Sử dụng năm từ memory.date
        const dateTimeMachine = new Date(year, dateMemory.getMonth() - 1, dateMemory.getDate())

        // Nếu dataTimeMachine là mảng, xử lý từng phần tử
        return dataTimeMachine.map(item => ({
          ...item.toObject(),  // Chuyển đổi mỗi phần tử của mảng sang đối tượng
          time: dateTimeMachine,
        }))
      })
    )

    // D Flat lại mảng nếu cần (trong trường hợp có nhiều đối tượng trong mỗi bộ nhớ)
    const flatTimeMachine = savedTimeMachine.flat()

    // Sau khi đã lấy toàn bộ dữ liệu từ Promise.all, tiến hành sắp xếp
    flatTimeMachine.sort((a, b) => a.time - b.time)

    // Trả về kết quả
    return res.status(200).json(flatTimeMachine)
  } catch (error) {
    console.error('Lỗi trong controller getTimeMachine:', error.message)
    return res.status(500).json({ error: 'Lỗi hệ thống' })
  }
}



module.exports = { createMemory, getMemoryToMonth, getYearlyMemory, createYearlyMemory, getTimeMachine }