const mongoose = require('mongoose')
const couple = require('./CoupleModel')

const albumsSchema = new mongoose.Schema({
  coupleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: couple,
    required: true
  },

  coverImage: {
    type: String,
    default: null
  },
  
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150
  },

  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  }
}, { timestamps: true })

const album = new mongoose.model('Album', albumsSchema)

module.exports = album