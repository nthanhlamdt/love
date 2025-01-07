import { Download, Hand, Move, PencilLine, Trash2 } from 'lucide-react'
import { deleteImageAlbums } from '../../../../../../api/api'
import { toast } from 'react-toastify'
import { useAlbumContext } from '~/context/albumContext'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Loading from '~/components/Loading'

export default function DropDownMenu({ menuRef, handleOpenImage, image, setIsModalUpdate }) {
  const { setAlbums, albums } = useAlbumContext()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteImage = async () => {
    setIsLoading(true)
    await deleteImageAlbums({ imageId: image._id })
      .then(() => {
        setIsLoading(false)
        const albumIndex = albums.findIndex((album) => album._id === id)

        if (albumIndex !== -1) {
          // Tạo bản sao của album để tránh thay đổi trực tiếp state
          const updatedAlbum = { ...albums[albumIndex] }

          // Lọc ra ảnh cần xóa khỏi mảng images
          updatedAlbum.images = updatedAlbum.images.filter((img) => img._id !== image._id)

          // Cập nhật lại state albums
          setAlbums((prev) => {
            const updatedAlbums = [...prev]
            updatedAlbums[albumIndex] = updatedAlbum // Thay thế album cũ bằng album đã cập nhật
            return updatedAlbums
          })

          toast.success('Đã xóa ảnh thành công!')
        }
      })

      .catch(() => {
        toast.error('Không tìm thấy album!')
        setIsLoading(false)
      })
  }

  const handleUpdateImage = async () => {
    setIsModalUpdate(true)
  }

  const handleDownloadImage = async (downloadUrl) => {
    try {
      // Fetch file từ URL
      const response = await fetch(downloadUrl)
      if (!response.ok) {
        throw new Error('Lỗi khi tải file')
      }

      // Chuyển đổi response thành Blob
      const blob = await response.blob()

      // Tạo URL từ Blob
      const blobUrl = window.URL.createObjectURL(blob)

      // Tạo một thẻ <a> ẩn để kích hoạt tải về
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = image.name || 'download' // Tên file khi tải về
      document.body.appendChild(link)
      link.click()

      // Dọn dẹp
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl) // Giải phóng bộ nhớ
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tải file')
    }
  }

  return (
    <div>
      <nav
        className='list-none rounded-md bg-white overflow-hidden p-2 w-52 text-pink-500 text-sm font-semibold'
        ref={menuRef}
      >
        {isLoading && <Loading />}
        <ul>
          <li
            className='flex items-center p-2 cursor-pointer rounded-sm hover:bg-pink-100'
            onClick={handleOpenImage}
          >
            <span className='mr-2'><Move size={20} /></span>
            Mở
          </li>

          <li
            className='flex items-center p-2 cursor-pointer rounded-sm hover:bg-pink-100'
            onClick={handleDeleteImage}
          >
            <span className='mr-2'><Trash2 size={20} /></span>
            Xóa
          </li>

          <li
            className='flex items-center p-2 cursor-pointer rounded-sm hover:bg-pink-100'
            onClick={handleUpdateImage}
          >
            <span className='mr-2'><PencilLine size={20} /></span>
            Chỉnh sửa
          </li>

          <li
            className='flex items-center p-2 cursor-pointer rounded-sm hover:bg-pink-100'
          >
            <span className='mr-2'><Hand size={20} /></span>
            Di chuyển
          </li>

          <li
            className='flex items-center p-2 cursor-pointer rounded-sm hover:bg-pink-100'
            onClick={() => {handleDownloadImage(image.src)}}
          >
            <span className='mr-2'><Download size={20} /></span>
            Tải xuống
          </li>
        </ul>
      </nav>
    </div>
  )
}
