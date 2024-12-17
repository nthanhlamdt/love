const mongoose = require('mongoose')
const couple = require('./CoupleModel')

const memoryTypeSchema = new mongoose.Schema({
  icon: { type: String, require: true },
  name: { type: String, require: true },
  coupleId: { type: mongoose.Schema.Types.ObjectId, ref: couple, require: true }
}, { timestamps: true })

const memoryType = new mongoose.model('MemoryType', memoryTypeSchema)

module.exports = memoryType