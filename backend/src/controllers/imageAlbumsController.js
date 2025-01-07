const imageAlbum = require("../models/imageAlbumModel")

const addImagesAlbum = async (req, res) => {
  try {
    let { albumId, name, time, location } = req.body; // Dữ liệu album từ body
     console.log(req.file)
    const imageUrl = req.file?.path; // Các ảnh tải lên từ req.files
   
    if (!albumId || !name || !location || !time) {
      return res.status(400).json({ error: "Album thiếu thông tin bắt buộc!" })
    }

    if (!imageUrl) {
      return res.status(400).json({ error: "Không có tệp ảnh được tải lên!" });
    }

    const imagesAlbum = new imageAlbum({
      albumId,
      name,
      time,
      location,
      src: imageUrl,
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

const updateImageAlbum = async (req, res) => {
  try {
    const { name, location, time, imageId } = req.body
    if (!name || !location || !imageId || !time) {
      return res.status(400).json({ error: 'Tài nguyên yêu cầu không tồn tại' })
    }

    const updatedImageAlbum = await imageAlbum.findByIdAndUpdate(
      imageId,
      { name, location, time },
      { new: true, runValidators: true }
    )

    if (!updatedImageAlbum) {
      return res.status(404).json({ error: 'Cập nhật không thành công' })
    }

    res.status(200).json(updatedImageAlbum)
  } catch (error) {
    console.error("Error in updateImageAlbum controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { addImagesAlbum, deleteImagesAlbum, updateImageAlbum }
