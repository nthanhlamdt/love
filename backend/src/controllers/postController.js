const Couple = require("../models/coupleModel");
const Post = require("../models/postModel");

const uploadPost = async (req, res) => {
  try {
    const { status } = req.body
    const userId = req.user._id
    const image = req.file?.path; 

    let userStatusPending = await Couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    });
    
    if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})
    
    const post = new Post({
      coupleId: userStatusPending._id,
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
    const userId = req.user._id;

    // Tìm cặp đôi
    let userStatusPending = await Couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    });
    
    if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})

    // Lấy bài viết kèm thông tin người dùng
    const posts = await Post.find({ coupleId: userStatusPending._id })
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