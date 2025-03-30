import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { addImageToAlbum, sendNotification } from '~/api/api'
import { useAlbumContext } from '~/context/albumContext'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Loading from '~/components/Loading'

export default function UploadFile() {
  const fileInputRef = useRef(null)
  const { setAlbums } = useAlbumContext()
  const userlove = JSON.parse(localStorage.getItem('userLove')) || {}
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [uploadCount, setUploadCount] = useState(0)

  const handleFileImageChange = async (e) => {
    const files = Array.from(e.target.files)
    setLoading(true)
    setUploadCount(0)

    const newFiles = []

    try {
      files.map(async (file) => {
        try {
          const dt = await addImageToAlbum({ albumId: id, file })
          newFiles.push(dt)
          setUploadCount((prev) => prev + 1)
        } catch (error) {
          toast.error(`Lỗi khi thêm file: ${file.name}`)
        }
      })

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

        // try {
        //   await sendNotification({
        //     type: 'add_file_album',
        //     title: `Đã thêm ${newFiles.length} file vào album ${album.name}`,
        //     phoneNumber: userlove.phoneNumber,
        //     albumId: album._id
        //   })
        //   toast.success(`Thêm ${newFiles.length} file thành công!`)
        // } catch (error) {
        //   toast.error('Lỗi khi gửi thông báo!')
        // }
      }
    } catch (error) {
      toast.error('Lỗi khi tải lên tệp!')
      setLoading(false)
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
