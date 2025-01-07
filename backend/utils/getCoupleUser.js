const getCoupleUser = async (userId) => {
  let userStatusPending = await couple.findOne({
    $or: [
      { userId: userId },
      { userLoveId: userId }
    ]
  });
    
  if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})

  const otherUserId = (userStatusPending.userId.toString() === userId.toString()) 
    ? userStatusPending.userLoveId // Fixed typo here
    : userStatusPending.userId;

  const userLove = await user.findOne({ _id: otherUserId }).select("-password")
  if (!userLove) return res.status(404).json({ error: 'Không tìm thấy thông tin người dùng ghép cặp' })
}