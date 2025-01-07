const mongoose = require('mongoose')
const couple = require('./coupleModel')
const memoryType = require('./memoryTypeModel')

const memorySchema = new mongoose.Schema({
  coupleId: { type: mongoose.Schema.Types.ObjectId, ref: couple, require: true },
  date: { type: Date, require: true },
  memoryType: { type: mongoose.Schema.Types.ObjectId, ref: memoryType, require: true }
}, { timestamps: true })

const memory = new mongoose.model('Memory', memorySchema)

module.exports = memory