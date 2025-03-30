require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình Cloudinary từ biến môi trường
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Cấu hình bộ lưu trữ trên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Kiểm tra định dạng file trước khi upload
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error('Định dạng file không hợp lệ! Chỉ hỗ trợ JPG, PNG, WEBP, GIF.');
    }

    return {
      folder: 'love_image', // Thư mục trên Cloudinary
      resource_type: 'image',
      format: 'webp', // Chuyển đổi tất cả sang WebP để tối ưu
      transformation: [
        { width: 1280, height: 720, crop: 'limit' }, // Giới hạn kích thước tối đa
        { quality: 'auto:eco' }, // Tự động tối ưu chất lượng & giảm dung lượng
      ],
    };
  },
});

// Middleware upload file với Multer
const uploadCloud = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Giới hạn tối đa 10MB (hợp lý hơn so với 50MB)
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ cho phép tải lên ảnh định dạng JPG, PNG, WEBP, GIF!'), false);
    }
  },
});

module.exports = uploadCloud;
