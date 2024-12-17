import { Heart } from 'lucide-react'
import ModalDetailHistory from '../ModalDetailHistory'
import { useState } from 'react'

export default function TypeChallegeHistory() {
  const [isModalDetil, setIsModalDetil] = useState(false)

  return (
    <div
      className="snap-center h-full mb-3 flex flex-col justify-between w-full border border-pink-600 p-3 rounded-md bg-white shadow-sm shadow-pink-500 cursor-pointer"
      onClick={() => setIsModalDetil(true)}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="px-3 py-1 bg-pink-500 text-white rounded-lg">Thử thách</span>
        <span className="flex items-center text-pink-600">
          <Heart size={16}/> 100
        </span>
      </div>

      <h2 className="text-pink-600 font-semibold text-md">Buổi hẹn hò</h2>
      <p className="text-sm text-pink-600 text-justify">
        Tổ chức một buổi hẹn bất ngờ cho người yêu
      </p>

      <span className='text-end text-xs text-pink-600'>29/12/2024</span>

      {isModalDetil && (
        <ModalDetailHistory
          setIsModalDetil={setIsModalDetil}
        />
      )}
    </div>
  )
}
