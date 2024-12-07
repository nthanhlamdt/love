const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  password: { type: String, required: true, minlength: 6},
  fullName: { type: String, required: true, maxlength: 100 },
  phoneNumber: { type: String, required: true, maxlength: 15 },
  avatar: { type: String, maxlength: 200, default: null },
  gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'], required: true },
  dateBirth: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'inactive'], default: 'inactive' },
  pending_request_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  loveDay: {
    type: Date,
    default: null
  }
}, { timestamps: true })

const user = mongoose.model('User', UserSchema)

module.exports = user