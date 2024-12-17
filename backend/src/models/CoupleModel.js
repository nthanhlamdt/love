const mongoose = require('mongoose')
const user = require('./userModel')

const CoupleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    default: null
  },

  userLoveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    default: null
  },

  loveDate: {
    type: Date,
    default: null
  }
}, { timestamps: true })

const couple = mongoose.model('Couple', CoupleSchema)

module.exports = couple