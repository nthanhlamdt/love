import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { addImageToAlbum, sendNotification } from '~/api/api'
import { useAlbumContext } from '~/context/albumContext'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Loading from '~/components/Loading'
import imageCompression from 'browser-image-compression'

export default function UploadFile({ album }) {
  const fileInputRef = useRef(null)
  const { setAlbums } = useAlbumContext()
  const userlove = JSON.parse(localStorage.getItem('userLove')) || {}
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [uploadCount, setUploadCount] = useState(0)
  const [previewUrls, setPreviewUrls] = useState([])

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1, // Kích thước tối đa 1MB
      maxWidthOrHeight: 1920, // Resize nếu ảnh quá lớn
      useWebWorker: true,
    }
    return await imageCompression(file, options)
  }

  const handleFileImageChange = async (e) => {
    const files = Array.from(e.target.files)
    setLoading(true)
    setUploadCount(0)

    // Hiển thị trước ảnh/video
    const urls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)

    // Kiểm tra kích thước file
    const validFiles = files.filter((file, index) => {
      const isValidSize = file.size <= 100 * 1024 * 1024 // Giới hạn 100MB
      if (!isValidSize) {
        toast.error(`File thứ ${index + 1} có kích thước quá lớn (tối đa 100MB)`)
        return false
      }
      return true
    })

    try {
      const compressedFiles = await Promise.all(validFiles.map(compressImage))
      const newFiles = []

      await Promise.all(
        compressedFiles.map(async (file) => {
          try {
            const dt = await addImageToAlbum({ albumId: album._id, file })
            newFiles.push(dt)
            setUploadCount((prev) => prev + 1)
          } catch (error) {
            toast.error(`Lỗi khi thêm file: ${file.name}`)
          }
        })
      )

      if (newFiles.length > 0) {
        setAlbums((prevAlbums) => {
          const albumIndex = prevAlbums.findIndex(a => a._id === id)
          if (albumIndex === -1) return prevAlbums

          const updatedAlbums = [...prevAlbums]
          updatedAlbums[albumIndex] = {
            ...updatedAlbums[albumIndex],
            images: [...newFiles, ...updatedAlbums[albumIndex].images],
          }
          return updatedAlbums
        })

        try {
          await sendNotification({
            type: 'add_file_album',
            title: `Đã thêm ${newFiles.length} file vào album ${album.name}`,
            phoneNumber: userlove.phoneNumber,
            albumId: album._id,
          })
          toast.success(`Thêm ${newFiles.length} file thành công!`)
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
        <div className="fixed z-[999] inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <Loading />
          <p className="text-white mt-4 text-lg font-semibold animate-pulse">
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
          <Upload className="mr-2" /> Thêm file
        </button>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="w-full h-32 bg-gray-200 overflow-hidden rounded-lg">
              <img src={url} alt="preview" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
