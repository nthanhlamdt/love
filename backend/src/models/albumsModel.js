const mongoose = require('mongoose')
const user = require('./userModel')

const albumsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true
  },

  userLoveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
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