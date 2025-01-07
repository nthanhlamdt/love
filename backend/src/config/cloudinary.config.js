require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})


const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png', 'mp4', 'avi', 'mov', 'webm'],
  params: {
    folder: 'love_image',
    resource_type: 'auto'
  }
})

const uploadCloud = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Giới hạn kích thước tệp tin là 100MB
  },
})

module.exports = uploadCloud;
