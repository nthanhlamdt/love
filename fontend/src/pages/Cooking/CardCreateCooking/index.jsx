import { useState } from 'react'
import ModalCreateCook from './ModalCreateCook'

export default function CardCreateCooking() {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsOpenModalCreate(true)}
        className='p-2 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer transform hover:-rotate-1 hover:bg-[rgba(0,0,0,0.1)]'>
        <img
          src='/assets/create_cooking.png'
          alt='test'
          className='hero w-[50%] object-cover object-center' />
        <p className='mt-5 text-xl text-center text-pink-500'>Cùng tạo món ăn, tạo ra cả thảm họa vui nhộn và đầy tiếng cười</p>
        <span>😂🍳🍝</span>
      </div>

      {isOpenModalCreate && <ModalCreateCook setIsOpenModalCreate={setIsOpenModalCreate} />}
    </>
  )
}
