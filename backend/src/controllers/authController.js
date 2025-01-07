const User = require('../models/userModel')
const Couple = require('../models/coupleModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment-timezone')

const register = async (req, res) => {
  try {
    const { password, confirmPassword, fullName, phoneNumber, gender, dateBirth } = req.body
    
    const existingUser = await User.findOne({ phoneNumber })
    if (existingUser) return res.status(400).json({ message: 'Số điện thoại đã tồn tại' })

    if (password !== confirmPassword) return res.status(400).json({ message: "Mật khẩu không trùng khớp" })

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10)

    const currentTimezone = moment.tz.guess()
    const formattedDateBirth = moment.tz(dateBirth, 'YYYY-MM-DD', currentTimezone).toDate()

    const avatar = gender == 'nam' ? '/assets/avatar_male.svg' : '/assets/avatar_female.svg'

    // Create user
    const user = new User({
      password: hashedPassword,
      fullName,
      phoneNumber,
      gender,
      dateBirth: formattedDateBirth,
      avatar
    })

    // Save user to the database
    await user.save()

    // Success response
    res.status(201).json({ message: 'Tạo tài khoản thành công' })
  } catch (error) {
    console.error("Error in register controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body

    const user = await User.findOne({ phoneNumber })
    if (!user) return res.status(404).json({ message: 'Số điện thoại không tồn tại' })

    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) return res.status(403).json({ message: 'Mật khẩu không chính xác' })

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET, 
      { expiresIn: '15d' }
    )

    const userStatusPending = await Couple.findOne({
      $or: [
        { userId: user._id },
        { userLoveId: user._id }
      ]
    })

    let status = 'inactive'

    if (userStatusPending) status = 'pending'

    let userPending = user.toObject()

    res.status(200).json({
      token,
      user: { ...userPending, status }
    })
  } catch (error) {
    console.error("Error in login controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = { register, login }
