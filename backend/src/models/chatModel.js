const mongoose = require('mongoose')
const couple = require('./coupleModel')
const user = require('./userModel')

const chatSchema = new mongoose.Schema({
  coupleId: { type: mongoose.Schema.Types.ObjectId, ref: couple, require: true },
  sendId: { type: mongoose.Schema.Types.ObjectId, ref: user, require: true },
  message: { type: String, require: true },
  status: { type: String, enum: ['readed', 'unread'], default: 'unread', require: true }
}, { timestamps: true })

const chat = new mongoose.model("chat", chatSchema)

module.exports = chat