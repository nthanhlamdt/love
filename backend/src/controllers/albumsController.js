const Albums = require('../models/albumsModel')
const couple = require('../models/coupleModel')
const imageAlbum = require('../models/imageAlbumModel')
const user = require('../models/userModel')
const cloudinary = require('cloudinary').v2

const getAlbums = async (req, res) => {
  try {
    const userId = req.user._id

    if (!userId) {
      return res.status(400).json({ error: "Cần cung cấp userId" })
    }

    const userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    });
    
    if (!userStatusPending) return res.status(404).json({error: 'Người dùng chưa kết nối!'})
    
    const albums = await Albums.find({coupleId: userStatusPending._id}).sort({ createdAt: -1 })

    if (albums.length === 0) {
      return res.status(404).json({ error: "Chưa có album nào" })
    }

    const albumImages = await Promise.all(
      albums.map(async album => {
        const images = await imageAlbum
          .find({ albumId: album._id })
          .sort({ createdAt: -1 })

        return {
          ...album.toObject(),
          images
        }
      })
    )

    res.status(200).json({
      albumImages
    })
  } catch (error) {
    console.error("Error in getAlbums controller:", error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

const createAlbums = async (req, res) => {
  try {
    const { name, description } = req.body
    const userId = req.user._id
    
    if (!name && !description) {
      return res.status(404).json({ error: 'Tài nguyên yêu cầu không tồn tại' })
    }

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

    const coverImage = '/assets/send_letter.png'
    const albums = new Albums({
      coupleId: userStatusPending.id,
      coverImage,
      name,
      description,
    })
    
    await albums.save()

    res.status(201).json({
      ...albums.toObject(),
      _id: albums._id
     })

  } catch (error) {
    console.error("Error in createAlbums controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const updateImageCover = async (req, res) => {
  try {
    const { albumId } = req.body
    const image = req.file

    if (!image) {
      return res.status(400).json({ error: 'Không có ảnh được tải lên' })
    }

    const imageUrl = image.path 

    const album = await Albums.findOne({ _id: albumId })
    if (!album) {
      return res.status(404).json({error: 'Không tìm thấy album'})
    }

    const publicId = album.coverImage.split('/').slice(-1)[0].split('.')[0]
    const folder = album.coverImage.split('/').slice(-2, -1)[0]
    const fullPublicId = `${folder}/${publicId}`
    const result = await cloudinary.uploader.destroy(fullPublicId)

    const updatedAlbum = await Albums.findByIdAndUpdate(
      albumId,
      { coverImage: imageUrl },
      { new: true, runValidators: true }
    )

    if (!updatedAlbum) {
      return res.status(404).json({ error: 'Cập nhật không thành công' })
    }

    res.json(updatedAlbum)
  } catch (error) {
    const image = req.file
    await cloudinary.uploader.destroy(image?.filename)
    console.error("Error in updateImageCover controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.body

    if (!albumId) {
      return res.status(400).json({ error: "Không đủ thông tin để xóa" })
    }

    const deletedAlbum = await Albums.findByIdAndDelete(albumId)

    if (!deletedAlbum) {
      return res.status(404).json({ error: "Album không tồn tại" })
    }

    res.json({ message: "Album đã được xóa thành công", album: deletedAlbum })
  } catch (error) {
    console.error("Error in deleteAlbum controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const updateAlbum = async (req, res) => {
  try {
    const { albumId, name, description } = req.body

    const updatedAlbum = await Albums.findByIdAndUpdate(
      albumId,
      { name, description },
      { new: true, runValidators: true }
    )

    if (!updatedAlbum) {
      return res.status(404).json({ error: 'Cập nhật không thành công' })
    }

    const images = await imageAlbum.find({ albumId: albumId })

    res.json({
      ...updatedAlbum.toObject(),
      images
    })
  } catch (error) {
    console.error("Error in updateAlbum controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



module.exports = { getAlbums, createAlbums, updateImageCover, deleteAlbum, updateAlbum }