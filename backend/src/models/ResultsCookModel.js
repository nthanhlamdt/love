const mongoose = require('mongoose')
const cook = require('./cookModel')
const user = require('./userModel')

const resultCookSchema  = new mongoose.Schema({
  cookId: { type: mongoose.Schema.Types.ObjectId, ref: cook, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: user, required: true },
  image: { type: String, required: true }
}, { timestamps: true })

const resultCook  = new mongoose.model('ResultCook', resultCookSchema )

module.exports = resultCook