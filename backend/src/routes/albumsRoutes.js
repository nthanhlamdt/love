const express = require('express')
const router = express.Router()
const { getAlbums, createAlbums, updateImageCover, deleteAlbum, updateAlbum } = require('../controllers/albumsController')
const authenticateToken = require('../middleware/authMiddleware')
const uploadCloud = require('../config/cloudinary.config')
const { addImagesAlbum, deleteImagesAlbum } = require('../controllers/imageAlbumsController')

router
  .get('/', authenticateToken, getAlbums)
  .post('/',authenticateToken, createAlbums)
  .patch('/', authenticateToken, uploadCloud.single('file'), updateImageCover)
  .delete('/', authenticateToken, deleteAlbum)
  .put('/', authenticateToken, updateAlbum)
  .post('/image', authenticateToken, uploadCloud.single('file'), addImagesAlbum )
  .delete('/image', authenticateToken, deleteImagesAlbum)

module.exports = router