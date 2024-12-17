const express = require('express')
const authenticateToken = require('../middleware/authMiddleware')
const { setLoveUser, getCoupleUser } = require('../controllers/userController')
const uploadCloud = require('../config/cloudinary.config')
const router = express.Router()

router
  .post('/setlove', authenticateToken, setLoveUser)
  .get('/setlove', authenticateToken, getCoupleUser)

module.exports = router