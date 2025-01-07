const express = require('express')
const authenticateToken = require('../middleware/authMiddleware')
const { setLoveUser, getCoupleUser, updateInfoUser, updateAvatarUser } = require('../controllers/userController')
const uploadCloud = require('../config/cloudinary.config')
const router = express.Router()

router
  .post('/setlove', authenticateToken, setLoveUser)
  .get('/setlove', authenticateToken, getCoupleUser)
  .put('/', authenticateToken, updateInfoUser)
  .patch('/', authenticateToken, uploadCloud.single('file'), updateAvatarUser)
module.exports = router