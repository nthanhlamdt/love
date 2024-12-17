const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authMiddleware');
const { uploadPost, getPost } = require('../controllers/postController');
const uploadCloud = require('../config/cloudinary.config');


router
  .post('/', authenticateToken, uploadCloud.single('file'), uploadPost)
  .get('/', authenticateToken, getPost)

module.exports = router;
