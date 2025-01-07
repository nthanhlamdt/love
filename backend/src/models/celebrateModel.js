const mongoose = require('mongoose')
const couple = require('./coupleModel')

const celebrateSchema = new mongoose.Schema({
  coupleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: couple,
    required: true
  },

  image1: {
    type: String,
    default: '/assets/celebrate_image_1.png'
  },

  text1: {
    type: String,
    default: 'Yêu là hạnh phúc'
  },
  
  image2: {
    type: String,
    default: '/assets/celebrate_image_2.png'
  },

  text2: {
    type: String,
    default: 'Tình yêu cần vun đắp'
  },

  image3: {
    type: String,
    default: '/assets/celebrate_image_3.png'
  },

  text3: {
    type: String,
    default: 'I love you'
  },

  image4: {
    type: String,
    default: '/assets/celebrate_image_4.png'
  },

  text4: {
    type: String,
    default: 'Yêu nhau là đủ'
  },
}, { timestamps: true })

const celebrate = new mongoose.model('Celebrate', celebrateSchema)

module.exports = celebrate