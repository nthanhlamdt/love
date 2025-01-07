import { useState } from 'react'
import GiftBoxSVG from '../../../../GiftBoxSVG'
import GiftBoxRandom from '~/pages/Challenges/GiftBoxRandom'

export default function HiddenGiftBox({ giftbox }) {
  const [isOpenGiftBoxRandom, setIsOpenGiftBoxRandom] = useState(false)
  return (
    <div>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer transform hover:-rotate-1'>
        <div className='relative'>
          <GiftBoxSVG />
        </div>

        <div className='px-5 pb-5 pt-2 relative'>
          <div className='relative group'>
            <h2 className='text-2xl font-bold text-pink-700 mb-1 overflow-hidden text-ellipsis whitespace-nowrap'>Hộp quà bí mật</h2>
          </div>

          <div className='relative group'>
            <p className='text-pink-600 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>
              Mở ra để khám phá những món quà bất ngờ!
            </p>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="px-4 py-2 bg-pink-100 font-semibold rounded-2xl text-pink-600">{giftbox.point} điểm</span>
            <span
              className="hover:bg-pink-100 px-4 py-2 font-semibold rounded-md border border-pink-500 text-pink-600"
              onClick={() => setIsOpenGiftBoxRandom(true)}
            >
              Đặt hàng
            </span>
          </div>
        </div>

      </div>
      {isOpenGiftBoxRandom && <GiftBoxRandom image={ giftbox.image } />}
    </div>
  )
}
