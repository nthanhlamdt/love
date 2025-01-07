const express = require('express')
const authenticateToken = require('../middleware/authMiddleware')
const { getMessage, sendMessage, updateMessagesStatusToReaded } = require('../controllers/chatController')
const router = express.Router()

router
  .get('/', authenticateToken, getMessage)
  .post('/', authenticateToken, sendMessage)
  .patch('/', authenticateToken, updateMessagesStatusToReaded)

module.exports = router