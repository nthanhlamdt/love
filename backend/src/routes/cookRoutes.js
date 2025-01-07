const express = require('express')
const authenticateToken = require('../middleware/authMiddleware')
const uploadCloud = require('../config/cloudinary.config')
const { createCooking, getCooking, getIngredient, getStep } = require('../controllers/cookController')

const router = express.Router()
router
  .get('/', authenticateToken, getCooking)
  .post('/', authenticateToken, uploadCloud.single('image'), createCooking)
  .get('/ingredient', getIngredient)
  .get('/step', getStep)

module.exports = router