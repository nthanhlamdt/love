const mongoose = require('mongoose')
const cook = require('./cookModel')

const stepSchema  = new mongoose.Schema({
  cookId: {type: mongoose.Schema.Types.ObjectId, ref: cook, required: true},
  description: { type: String, required: true },
  order: { type: Number, required: true },
}, { timestamps: true })

const step  = new mongoose.model('Step ', stepSchema )

module.exports = step 