const express = require('express')
const router = express.Router()
const { sendNotification, getNotification, readingSend } = require('../controllers/notificationsController')
const authenticateToken = require('../middleware/authMiddleware')


router.post('/', authenticateToken, sendNotification)
router.post('/reading', readingSend)
router.get('/', authenticateToken, getNotification)

module.exports = router;
