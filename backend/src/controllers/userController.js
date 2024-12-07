const { default: mongoose } = require('mongoose');
const Notification = require('../models/NotificationsModel');
const User = require('../models/userModel')

const getUser = async(req, res) => {
   try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId }).select("-password");

    // Nếu không tìm thấy người dùng, trả về 404
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Kiểm tra xem có pending_request_id hay không
    let userPending = user.toObject(); // Chuyển đổi để không thay đổi đối tượng gốc

    if (user.pending_request_id) {
      const userPendingRequest = await User.findOne({ _id: user.pending_request_id }).select("-password");

      if (userPendingRequest) {
        userPending.pending_request_to = userPendingRequest;
      }
    }

    return res.status(200).json(userPending);
  } catch (error) {
    console.error("Error in getUser controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const setLoveUser = async (req, res) => {
  try {
    const { status, sendId, dateLove, notificationId } = req.body;

    console.log(req.body)
    // Kiểm tra các trường bắt buộc
    if (!status || !sendId || !dateLove || !notificationId) {
      return res.status(400).json({ error: "Thiếu thông tin cần thiết" });
    }

    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    const userSend = await User.findOne({ _id: sendId });

    if (status !== 'accept' && status !== 'refusal') {
      return res.status(400).json({ error: "Không hợp lệ" });
    }

    let result;
    if (status === 'refusal') {
      const notificationUpdate = await Notification.findOneAndUpdate(
        { _id: notificationId },
        { status: 'Pending' },
        { new: true }
      );
      result = `Bạn đã từ chối ghép đôi với ${userSend.fullName}`;
    } else if (status === 'accept') {
      if (user.status === 'pending') {
        return res.status(401).json({ error: "Bạn đang trong trạng thái ghép đôi không thể chấp nhận" });
      }
      if (userSend.status === 'pending') {
        return res.status(401).json({ error: "Đối phương đã ghép đôi với người khác" });
      }

      await Notification.findOneAndUpdate(
        { _id: notificationId },
        { status: 'Pending' },
        { new: true }
      );

      await User.findOneAndUpdate(
        { _id: userId },
        { status: 'pending', pending_request_id: userSend._id, loveDay: dateLove },
        { new: true }
      );

      await User.findOneAndUpdate(
        { _id: sendId },
        { status: 'pending', pending_request_id: userId, loveDay: dateLove },
        { new: true }
      );

      result = `Bạn và ${userSend.fullName} đã trở thành người yêu của nhau`;
    }

    return res.status(200).json({message: result})
  } catch (error) {
    console.error("Error in setLoveUser controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};





module.exports = { getUser, setLoveUser }

