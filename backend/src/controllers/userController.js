const celebrate = require('../models/celebrateModel');
const Couple = require('../models/CoupleModel');
const memoryType = require('../models/memoryTypeModel');
const Notification = require('../models/NotificationsModel');
const User = require('../models/userModel');
const { getReceiverSocketId, io } = require("../socket/socket");

const setLoveUser = async (req, res) => {
  try {
    const { status, sendId, loveDate, notificationId } = req.body;

    if (!status || !sendId || !loveDate || !notificationId) {
      return res.status(400).json({ error: "Thiếu thông tin cần thiết" });
    }


    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    const userSend = await User.findOne({ _id: sendId });

    if (status !== 'accept' && status !== 'refusal') {
      return res.status(400).json({ error: "Không hợp lệ" });
    }

    if (status === 'refusal') {
      // Update notification when refused
      const updatedNotification = await Notification.findOneAndUpdate(
        { _id: notificationId },
        {
          status: 'Pending',
          title: `Lời mời từ ${userSend.fullName} đã bị bạn từ chối`,
        },
        { new: true }
      );

      const receiverSocketId = getReceiverSocketId(sendId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('loveRequestRefused', { userId, userSend });
      }

      return res.status(200).json({
        message: `Bạn đã từ chối lời mời của ${userSend.fullName}`,
        notification: updatedNotification,
        userSend: userSend,
      });
    } else if (status === 'accept') {
      const checkUser = await Couple.findOne({
        $or: [{ userId: userId }, { userLoveId: userId }],
      });

      if (checkUser) {
        return res.status(401).json({ error: "Bạn đang trong trạng thái ghép đôi không thể chấp nhận" });
      }

      const checkSend = await Couple.findOne({
        $or: [{ userId: sendId }, { userLoveId: sendId }],
      });

      if (checkSend) {
        return res.status(401).json({ error: "Đối phương đã ghép đôi với người khác" });
      }

      const existingCouple = await Couple.findOne({
        $or: [
          { userId: userId, userLoveId: sendId },
          { userId: sendId, userLoveId: userId },
        ],
      });

      if (existingCouple) {
        return res.status(400).json({ error: "Các bạn đã là một cặp đôi" });
      }

      const newCouple = new Couple({
        userId: userId,
        userLoveId: sendId,
        loveDate: loveDate,
      });

      await newCouple.save();

      const updatedNotification = await Notification.findOneAndUpdate(
        { _id: notificationId },
        {
          status: 'accepted',
          title: `Bạn và ${userSend.fullName} đã trở thành một cặp đôi! Chúc mừng hạnh phúc!`,
        },
        { new: true }
      );

      const newCoupleUser = { ...userSend.toObject(), loveDate: loveDate };
      const receiverSocketIdA = getReceiverSocketId(userId);
      const receiverSocketIdB = getReceiverSocketId(sendId);


      console.log("idsocketA: ", receiverSocketIdA)
      console.log("idsocketB: ", receiverSocketIdB)
      if (receiverSocketIdA) {
        io.to(receiverSocketIdA).emit('newCouple', newCoupleUser);
      }
      if (receiverSocketIdB) {
        io.to(receiverSocketIdB).emit('newCouple', newCoupleUser);
      }

      const celebration = new celebrate({
        coupleId: newCouple._id,
      });
      await celebration.save();

      const memoryTypes = [
        { icon: '🌟', name: 'kỷ niệm đặc biệt' },
        { icon: '💕', name: 'Ngày hẹn hò' },
        { icon: '🗓️', name: 'Ngày lễ hằng năm' },
      ];

      for (const memory of memoryTypes) {
        const newMemoryType = new memoryType({
          coupleId: newCouple._id,
          icon: memory.icon,
          name: memory.name,
        });

        await newMemoryType.save();
        console.log(`Memory type "${memory.name}" đã được lưu thành công.`);
      }

      return res.status(200).json({
        message: `Bạn và ${userSend.fullName} đã trở thành người yêu của nhau`,
        notification: updatedNotification,
        user: newCoupleUser,
      });
    }
  } catch (error) {
    console.error("Error in setLoveUser controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCoupleUser = async(req, res) => {
  const userId = req.user._id

  let userStatusPending = await Couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
  });
  
  if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})

  const otherUserId = (userStatusPending.userId.toString() === userId.toString()) 
    ? userStatusPending.userLoveId // Fixed typo here
    : userStatusPending.userId;

  const userLove = await User.findOne({ _id: otherUserId }).select("-password")
  if (!userLove) return res.status(404).json({ error: 'Không tìm thấy thông tin người dùng ghép cặp' })
  
  return res.status(201).json({...userLove.toObject(), loveDate: userStatusPending.loveDate})
}

module.exports = { setLoveUser, getCoupleUser }
