const mongoose = require('mongoose');
const album = require('./albumsModel');
const user = require('./userModel');

const notificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: user, require: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: user, require: true },
  message: String,
  status: { type: String, enum: ['pending', 'read', 'unread', 'see'], default: 'unread' },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, enum: ['love_request', 'event', 'album', 'add_image_album'], required: true },
  title: { type: String, required: true },
  loveDate: { type: Date },
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: album}
});

const notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

module.exports = notification;
