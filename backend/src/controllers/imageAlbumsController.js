const album = require("../models/albumsModel")
const imageAlbum = require("../models/imageAlbumModel")

const addImagesAlbum = async (req, res) => {
  try {
    const { albumId } = req.body;
    const imageUrl = req.file?.path;

    // Kiểm tra albumId hợp lệ
    if (!albumId?.trim()) {
      return res.status(422).json({ error: "Thiếu albumId hợp lệ!" });
    }

    // Kiểm tra album có tồn tại hay không
    const albumExists = await album.findById(albumId);
    if (!albumExists) {
      return res.status(404).json({ error: "Album không tồn tại!" });
    }

    // Kiểm tra file ảnh đã được tải lên chưa
    if (!imageUrl) {
      return res.status(400).json({ error: "Không có tệp ảnh được tải lên!" });
    }

    // Lưu ảnh vào database
    const newImage = await new imageAlbum({ albumId, src: imageUrl }).save();

    // Trả về kết quả thành công
    return res.status(201).json(newImage);
  } catch (error) {
    console.error("Lỗi trong addImagesAlbum:", error.message);
    return res.status(500).json({
      error: "Lỗi máy chủ nội bộ",
      message: error.message,
      details: error.stack,
    });
  }
};


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
