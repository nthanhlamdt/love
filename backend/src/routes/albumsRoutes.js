const express = require('express')
const router = express.Router()
const { getAlbums, createAlbums } = require('../controllers/albumsController')

router.get('/', getAlbums)
router.post('/', createAlbums)
module.exports = router