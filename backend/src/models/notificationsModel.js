const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  status: { type: String, enum: ['pending', 'read', 'unread', 'see'], default: 'unread' },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, enum: ['message', 'like', 'comment', 'love_request', 'event'], required: true },
  title: { type: String, required: true },
  loveDate: { type: Date },
});

const notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

module.exports = notification;
