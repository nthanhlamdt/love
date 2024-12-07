const mongoose = require('mongoose')

const albumsSchema = new mongoose.Schema({
  userId: {
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
    minlength: 10,
    maxlength: 150
  },

  description: {
    type: String,
    required: true,
    minlength: 30,
    maxlength: 255
  }
}, { timestamps: true })

const albums = new mongoose.model('Albums', albumsSchema)

module.exports = albums