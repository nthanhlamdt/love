import { Download, Hand, Move, PencilLine, Trash2 } from 'lucide-react'
import { deleteImageAlbums } from '../../../../../../api/api'
import { toast } from 'react-toastify'

export default function DropDownMenu({ menuRef, handleOpenImage, image }) {

  const handleDeleteImage = () => {
    deleteImageAlbums({ imageId: image._id })
      .then(() => {
        toast.success('Đã xóa ảnh thành công!')
      })
      .catch(() => {
        toast.error('Có lỗi xảy ra vui lòng thử lại!')
      })
  }

  return (
    <nav
      className='list-none rounded-md bg-white overflow-hidden p-2 w-52 text-pink-500 text-sm font-semibold'
      ref={menuRef}
    >
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
          onClick={() => {
          }}
        >
          <span className='mr-2'><Download size={20} /></span>
          Tải xuống
        </li>
      </ul>
    </nav>
  )
}
