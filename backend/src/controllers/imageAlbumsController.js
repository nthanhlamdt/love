const album = require("../models/albumsModel")
const imageAlbum = require("../models/imageAlbumModel")

const addImagesAlbum = async (req, res) => {
  try {
    let { albumId } = req.body
    const imageUrl = req.file?.path
   
    const isAlbumId = await album.findOne({ _id: albumId })
    if (!isAlbumId) {
      return res.status(400).json({ error: "Album không hợp lệ!" })
    }

    if (!imageUrl) {
      return res.status(400).json({ error: "Không có tệp ảnh được tải lên!" });
    }

    const imagesAlbum = new imageAlbum({
      albumId,
      src: imageUrl
    })

    const SavedImageAlbum = await imagesAlbum.save()

      // Trả về phản hồi thành công
    return res.status(201).json(SavedImageAlbum)
  } catch (error) {
    console.error("Error in addImagesAlbum controller:", error.message);
    return res.status(500).json({ error: error.message || "Internal Server Error", details: error.stack });
  }
}

const deleteImagesAlbum = async (req, res) => {
  const { imageId } = req.body
  
  if (!imageId) {
    return res.status(400).json({ error: "Không đủ thông tin để xóa" })
  }

  try {
    const deletedImageAlbum = await imageAlbum.findByIdAndDelete(imageId)
    if (!deletedImageAlbum) {
      return res.status(404).json({ error: "Image xóa không thành công!" })
    }

    res.json({ message: "Image đã được xóa thành công", album: deletedImageAlbum })
  } catch (error) {
    console.error("Error in deleteImagesAlbum controller:", error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = { addImagesAlbum, deleteImagesAlbum }
