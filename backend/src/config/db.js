const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('Mongo URI:', process.env.MONGO_URI); // Kiểm tra giá trị
        await mongoose.connect(process.env.MONGO_URI); // Xóa các tùy chọn cũ
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
