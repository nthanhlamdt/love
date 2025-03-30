import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { addImageToAlbum } from '~/api/api'
import { useAlbumContext } from '~/context/albumContext'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Loading from '~/components/Loading'

export default function UploadFile() {
  const fileInputRef = useRef(null)
  const { setAlbums } = useAlbumContext()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [uploadCount, setUploadCount] = useState(0)

  const handleFileImageChange = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setLoading(true)
    setUploadCount(0)

    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          try {
            return await addImageToAlbum({ albumId: id, file })
          } catch (error) {
            toast.error(`Lỗi khi thêm file: ${file.name}`)
            return null
          }
        })
      )

      const validFiles = uploadedFiles.filter(Boolean) // Lọc ra các tệp tải lên thành công

      setUploadCount(validFiles.length)

      if (validFiles.length > 0) {
        setAlbums((prevAlbums) => {
          const updatedAlbums = prevAlbums.map((album) =>
            album._id === id
              ? { ...album, images: [...validFiles, ...album.images] }
              : album
          )
          return updatedAlbums
        })
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
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
        >
          <Upload className="mr-2" /> Thêm file
        </button>
      </div>
    </>
  )
}
