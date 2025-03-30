import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { addImageToAlbum, sendNotification } from '~/api/api'
import { useAlbumContext } from '~/context/albumContext'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Loading from '~/components/Loading'

export default function UploadFile({ album }) {
  const fileInputRef = useRef(null)
  const { setAlbums } = useAlbumContext()
  const userlove = JSON.parse(localStorage.getItem('userLove'))
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [uploadCount, setUploadCount] = useState(0) // Số lượng ảnh đã tải lên thành công

  const handleFileImageChange = async (e) => {
    const files = Array.from(e.target.files)
    setLoading(true)
    setUploadCount(0) // Reset số lượng ảnh đã tải lên

    // Kiểm tra loại tệp và kích thước
    const validFiles = files.filter((file, index) => {
      const isValidSize = file.size <= 1000 * 1024 * 1024 // Giới hạn kích thước file dưới 100MB

      if (!isValidSize) {
        toast.error(`File thứ ${index + 1} có kích thước quá lớn (tối đa 100MB)`)
        return false
      }
      return isValidSize
    })

    const newImages = []

    try {
      // Tải lên tất cả các tệp cùng lúc bằng Promise.all
      await Promise.all(
        validFiles.map(async (item) => {
          try {
            const dt = await addImageToAlbum({ albumId: album._id, file: item })
            newImages.push(dt)
            setUploadCount((prev) => prev + 1) // Tăng số lượng ảnh đã tải lên
          } catch (error) {
            toast.error(`Lỗi khi thêm file: ${item.name}`)
          }
        })
      )

      if (newImages.length > 0) {
        setAlbums((prevAlbums) =>
          prevAlbums.map((a) => {
            if (a._id === id) {
              return {
                ...a,
                images: [...newImages, ...a.images] // Thêm ảnh mới vào đầu danh sách
              }
            }
            return a
          })
        )

        // Gửi thông báo
        try {
          await sendNotification({
            type: 'add_image_album',
            title: `Đã thêm ${newImages.length} ảnh vào album ${album.name}`,
            phoneNumber: userlove.phoneNumber,
            albumId: album._id
          })
          toast.success(`Thêm ${newImages.length} ảnh thành công!`)
        } catch (error) {
          toast.error('Lỗi khi gửi thông báo!')
        }
      }
    } catch (error) {
      toast.error('Lỗi khi tải lên tệp!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed z-[999] inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Loading />
          <p className="text-white mt-4">
            Đang tải lên... {uploadCount}/{fileInputRef.current?.files?.length || 0}
          </p>
        </div>
      )}
      <div>
        <input
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileImageChange}
          accept="image/*, video/*"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
        >
          <Upload className="mr-2" /> Thêm ảnh
        </button>
      </div>
    </>
  )
}