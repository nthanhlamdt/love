import { useState } from 'react'
import ModalCreateAlbum from './ModalCreateAlbum'

export default function CreateCardAlbum() {
  const [isModal, setIsModal] = useState(false)
  return (
    <>
      <div
        className='p-2 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer transform hover:-rotate-1 hover:bg-[rgba(0,0,0,0.1)]'
        onClick={() => setIsModal(true)}
      >
        <img
          src='/assets/createAlbum.png'
          alt='test'
          className='hero w-[50%] object-cover object-center' />
        <p className='mt-5 text-xs sm:text-sm xl:text-xl text-center text-pink-500'>Nhấn vào đây để tạo album ảnh, lưu giữ mọi khoảnh khắc đáng nhớ nhé! 📸✨</p>
      </div>

      {isModal && (<ModalCreateAlbum setIsModal={ setIsModal } scale={50} />)}
    </>
  )
}
