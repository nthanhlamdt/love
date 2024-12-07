const mongoose = require('mongoose')
const albums = require('./albumsModel')
const user = require('./userModel')

const imageAlbumSchema = new mongoose.Schema({
  albumID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: albums,
    required: true 
  },

  src: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150
  },

  
  location: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
}, { timestamps: true })

const imageAlbum = mongoose.model('ImageAlbum', imageAlbumSchema)
module.exports = imageAlbum