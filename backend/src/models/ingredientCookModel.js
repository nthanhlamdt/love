const mongoose = require('mongoose')
const cook = require('./cookModel')

const ingredientSchema = new mongoose.Schema({
  cookId: {type: mongoose.Schema.Types.ObjectId, ref: cook, required: true},
  name: { type: String, required: true },
  amount: { type: String, required: true },
  unit: { type: String, required: true },
}, { timestamps: true })

const ingredient = new mongoose.model('Ingredient', ingredientSchema)

module.exports = ingredient