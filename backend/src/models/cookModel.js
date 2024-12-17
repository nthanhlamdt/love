const mongoose = require('mongoose')
const couple = require('./CoupleModel')

const cookSchema = new mongoose.Schema({
  coupleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: couple,
    required: true
  },

  name: {
    type: String,
    required: true,
    minlength: 1,
  },

  title: {
    type: String,
    required: true,
    minlength: 1,
  },

  description: {
    type: String,
    required: true,
    minlength: 1,
  },

  time: {
    type: Date,
    required: true,
  },

  peopleEating: {
    type: Number,
    require: true
  },

}, { timestamps: true })

const cook = new mongoose.model('Cook', cookSchema)

module.exports = cook