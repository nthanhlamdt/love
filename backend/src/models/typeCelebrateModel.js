const mongoose = require('mongoose')

const typeCelebrateSchema = new mongoose.Schema({
  celebrateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Celebrate',
    require: true
  },

  type: {
    type: String,
    require: true
  }
})

const typeCelabrate = new mongoose.model('TypeCelabrate', typeCelebrateSchema)

module.exports = typeCelabrate