const express = require('express')
const { getMemoryType, createMemoryType } = require('../controllers/memoryTypeController')
const authenticateToken = require('../middleware/authMiddleware')
const { createMemory, getMemoryToMonth, getYearlyMemory, createYearlyMemory, getTimeMachine } = require('../controllers/memoryController')
const uploadCloud = require('../config/cloudinary.config')
const router = express.Router()


router
  .get('/', authenticateToken, getMemoryToMonth)
  .post('/', authenticateToken, uploadCloud.single('image'), createMemory)
  .get('/type', authenticateToken, getMemoryType)
  .post('/type', authenticateToken, createMemoryType)
  .get('/yearly', getYearlyMemory)
  .post('/yearly', authenticateToken, uploadCloud.single('image'), createYearlyMemory)
  .get('/time-machine', authenticateToken, getTimeMachine)

module.exports = router