const mongoose = require('mongoose')
const memory = require('./memoryModel')
const user = require('./userModel')

const yearlyMemorySchema = new mongoose.Schema({
  memoryId: {type: mongoose.Schema.Types.ObjectId, ref: memory, require: true},
  year: { type: Number, require: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  image: { type: String },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: user, require: true}
}, { timestamps: true })

const yearlyMemory = new mongoose.model('yearlyMemory', yearlyMemorySchema)

module.exports = yearlyMemory