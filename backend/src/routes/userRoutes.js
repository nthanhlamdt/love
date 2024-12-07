const express = require('express')
const authenticateToken = require('../middleware/authMiddleware')
const { getUser, setLoveUser } = require('../controllers/userController')
const router = express.Router()

router.get('/', authenticateToken, getUser)
router.post('/setlove', authenticateToken, setLoveUser)

module.exports = router