const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    required: true
  },
  sendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    required: true
  },
  dateLove: {
    type: Date,
    require: true
  },
  message: {
    type: String,
    required: true
  },
  title: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Sent', 'Read'],
    default: 'Sent'
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;