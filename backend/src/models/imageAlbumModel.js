const mongoose = require('mongoose')
const albums = require('./albumsModel')
const user = require('./userModel')

const imageAlbumSchema = new mongoose.Schema({
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: albums,
    required: true 
  },

  src: {
    type: String,
    required: true
  }
}, { timestamps: true })

const imageAlbum = mongoose.model('ImageAlbum', imageAlbumSchema)
module.exports = imageAlbum