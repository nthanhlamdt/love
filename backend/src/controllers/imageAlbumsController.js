const imageAlbum = require("../models/imageAlbumModel")

const addImagesAlbum = async (req, res) => {
  let { data } = req.body  // Dữ liệu album từ body
  const imageUrl = req.files  // Các ảnh tải lên từ req.files

  data = JSON.parse(data)
  // Kiểm tra dữ liệu đầu vào
  if (!data || data.length === 0) {
    return res.status(400).json({ error: "Dữ liệu album không hợp lệ!" })
  }

  if (!imageUrl || imageUrl.length === 0) {
    return res.status(400).json({ error: "Không có tệp ảnh nào được tải lên!" })
  }

  try {
    let arrayImageCreate = []
    for (let index = 0; index < data.length; index ++ ) {
      const dt = data[index]
      const image = imageUrl[index]
      
      if (!dt.albumId || !dt.name || !dt.location || !dt.time) {
        return res.status(400).json({ error: `Album ${index + 1} thiếu thông tin bắt buộc!` })
      }

      const imagesAlbum = new imageAlbum({
        albumId: dt.albumId,
        name: dt.name,
        time: dt.time,
        location: dt.location,
        src: image.path, // Đảm bảo src là đường dẫn hình ảnh, nếu dùng Cloudinary sẽ có URL
      })

      // Lưu đối tượng vào cơ sở dữ liệu
      const images = await imagesAlbum.save()
      arrayImageCreate.push(images)
    }

    // Trả về phản hồi thành công
    return res.status(201).json({ arrayImageCreate })

  } catch (error) {
    console.error("Error in addImagesAlbum controller:", error.message)
    return res.status(500).json({ error: "Internal Server Error" })
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
