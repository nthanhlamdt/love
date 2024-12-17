const express = require('express')
const { getMemoryType } = require('../controllers/memoryTypeController')
const authenticateToken = require('../middleware/authMiddleware')
const { createMemory, getMemoryToMonth, getYearlyMemory, createYearlyMemory } = require('../controllers/memoryController')
const uploadCloud = require('../config/cloudinary.config')
const router = express.Router()


router
  .get('/', authenticateToken, getMemoryToMonth)
  .post('/', authenticateToken, uploadCloud.single('image'), createMemory)
  .get('/type', authenticateToken, getMemoryType)
  .get('/yearly', getYearlyMemory)
  .post('/yearly', authenticateToken, uploadCloud.single('image'), createYearlyMemory)

module.exports = router