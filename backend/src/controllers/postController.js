const Couple = require("../models/CoupleModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const { post } = require("../routes/celebrateRoutes");

const uploadPost = async (req, res) => {
  try {
    const { userLove, status } = req.body
    const userId = req.user._id
    const image = req.file?.path; 

    const existingCouple = await Couple.findOne({
      $or: [
        { userId: userId, userLoveId: userLove },
        { userId: userLove, userLoveId: userId }
      ]
    });

    if (!existingCouple) return res.status(401).json({ message: 'bạn chưa kết nối đến ai' })
    
    const post = new Post({
      coupleId: existingCouple._id,
      userPostId: userId,
      status: status,
      image: image
    })

    if (!post) return res.status(401).json({ error: 'không thể thêm post' })
    post.save()
    
    return res.status(201).json(post)
  } catch (error) {
    console.error('Error in uploadPost controller:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getPost = async (req, res) => {
  try {
    const { userLoveId } = req.query;
    const userId = req.user._id;

    // Tìm cặp đôi
    const existingCouple = await Couple.findOne({
      $or: [
        { userId: userId, userLoveId: userLoveId },
        { userId: userLoveId, userLoveId: userId },
      ],
    });

    if (!existingCouple)
      return res.status(401).json({ message: 'Bạn chưa kết nối đến ai' });

    // Lấy bài viết kèm thông tin người dùng
    const posts = await Post.find({ coupleId: existingCouple._id })
      .populate('userPostId', 'fullName avatar')  // Thay đổi dựa trên schema User
      .sort({ createdAt: -1 }); // Sắp xếp giảm dần theo ngày tạo

    // Trả về kết quả
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error in getPost controller:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { uploadPost, getPost }