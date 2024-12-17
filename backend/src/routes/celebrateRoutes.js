const express = require('express')
const { getCelebrate, updateCelebrate } = require('../controllers/celebrateController')
const authenticateToken = require('../middleware/authMiddleware')
const uploadCloud = require('../config/cloudinary.config')


const router = express.Router()

router
  .get('/', authenticateToken, getCelebrate)
  .patch('/', authenticateToken, uploadCloud.single('file'), updateCelebrate)
module.exports = router