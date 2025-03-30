require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'love_image',
    resource_type: 'auto',
    format: async (req, file) => 'webp', // Chuyển sang WebP
    transformation: [
      { width: 1280, height: 720, crop: 'limit' }, // Resize nhỏ hơn để tối ưu
      { quality: 'auto:good' }, // Giảm kích thước nhưng vẫn giữ chất lượng
    ],
  },
});

const uploadCloud = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // Giới hạn 50MB để tránh file quá lớn
  },
});

module.exports = uploadCloud;
