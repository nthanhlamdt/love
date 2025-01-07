const mongoose = require('mongoose')
const couple = require('./coupleModel')

const cookSchema = new mongoose.Schema({
  coupleId: { type: mongoose.Schema.Types.ObjectId, ref: couple, required: true},
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Number,required: true },
  peopleEating: { type: Number, require: true },
  image: { type: String, require: true }
}, { timestamps: true })

const cook = new mongoose.model('Cook', cookSchema)

module.exports = cook