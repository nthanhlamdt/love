
import { useNavigate } from 'react-router-dom'
import { Move, Trash2, PencilLine, ImageUp, Download } from 'lucide-react'

import { useState } from 'react'
import ModalDeleteAlbum from './ModalDeleteAlbum'
import ModalUpdateAlbum from './ModalUpdateAlbum'


export default function Menu({ album, menuRef, fileInputRef }) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      ref={menuRef}
      className='absolute top-7 md:top-12 right-3 bg-white shadow-lg rounded z-10'
    >
      {loading && <span className="absolute loading loading-spinner loading-lg end-0 text-pink-500"></span>}
      <nav
        className='list-none overflow-hidden p-2 w-40 md:w-52 text-pink-500 text-sm font-semibold'>
        <ul>
          <li
            className='flex items-center p-1 md:p-2 cursor-pointer rounded-sm hover:bg-pink-100'
            onClick={() => navigate(`/album/${album._id}`)}
          >
            <span className='mr-2'><Move size={20} /></span>
            Mở
          </li>

          <li
            className='flex items-center p-1 md:p-2 cursor-pointer rounded-sm hover:bg-pink-100'
            onClick={() => document.getElementById('modal_delete_album').showModal()}
          >
            <span className='mr-2'><Trash2 size={20} /></span>
            Xóa
          </li>

          <li
            className='flex items-center p-1 md:p-2 cursor-pointer rounded-sm hover:bg-pink-100'
            onClick={() => document.getElementById('modal_update_album').showModal()}
          >
            <span className='mr-2'><PencilLine size={20} /></span>
            Chỉnh sửa
          </li>

          <li
            className='flex items-center p-1 md:p-2 cursor-pointer rounded-sm hover:bg-pink-100'
            onClick={() => fileInputRef.current?.click()}
          >
            <span className='mr-2'><ImageUp size={20} /></span>
            Cập nhật ảnh bìa
          </li>
        </ul>
      </nav>
      <ModalDeleteAlbum
        setLoading={setLoading}
        album={album}
      />

      <ModalUpdateAlbum
        album={album}
      />
    </div>
  )
}
