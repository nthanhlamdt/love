require('dotenv').config()

const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

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
    resource_type: 'auto',
    quality: 'auto:best', // Đảm bảo chất lượng tốt nhất
    fetch_format: 'jpg', // Chỉ định định dạng đầu ra
    transformation: [
      { width: 1920, height: 1080, crop: 'limit' }, // Điều chỉnh kích thước phù hợp
      { effect: 'improve' }, // Bỏ hiệu ứng này nếu không cần thiết
    ]
  }
})

const uploadCloud = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // Tăng giới hạn kích thước file nếu cần
  },
})

module.exports = uploadCloud