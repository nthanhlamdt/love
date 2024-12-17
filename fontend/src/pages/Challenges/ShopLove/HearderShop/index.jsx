import { AnimatePresence, motion } from 'framer-motion'
import { Box, RectangleEllipsis, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import ModalShopCart from './ModalShopCart'
import ModalBought from './ModalBought'
import ModalRequestGiftbox from './ModalRequestGiftbox'

export default function HearderShop({ shoppingCart }) {
  const [hearts, setHearts] = useState([])
  const [isOpenModal, setIsOpenModal] = useState('')

  const addHeart = (event, type) => {
    const newHeart = {
      id: Date.now(),
      x: event.clientX,
      y: event.clientY
    }
    setHearts(prev => [...prev, newHeart])
    setIsOpenModal(type)
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id))
    }, 1000)
  }

  return (
    <div className="py-5 text-pink-500 font-semibold text-md">
      <div className='flex items-center justify-between'>
        <span className='border-4 border-pink-600 rounded-xl py-2 px-4'><span className='font-bold text-2xl '>5000 </span>điểm</span>

        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              className="fixed pointer-events-none"
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 0, scale: 1, y: -50 }}
              exit={{ opacity: 0 }}
              style={{ left: heart.x, top: heart.y }}
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>

        <div className='flex'>
          <div
            className='flex py-2 px-4 bg-pink-100 rounded-lg items-center cursor-pointer relative hover:bg-pink-50'
            onClick={(e) => addHeart(e, 'shopping cart')}
          >
            <ShoppingCart className='mr-1' />
            <span className='hidden md:block'>giỏ hàng</span>
            {shoppingCart.length != 0 && <span className='absolute -top-2 -right-1 bg-pink-800 px-2 text-white text-sm rounded-full'>{shoppingCart.length}</span>}
          </div>

          <div
            className='flex py-2 px-4 bg-pink-100 rounded-lg items-center mx-2 cursor-pointer relative hover:bg-pink-50'
            onClick={(e) => addHeart(e, 'bought')}
          >
            <Box className='mr-1' />
            <span className='hidden md:block'>Đã mua</span>
            <span className='absolute -top-2 -right-1 bg-pink-800 px-2 text-white text-sm rounded-full'>2</span>
          </div>

          <div
            className='flex py-2 px-4 bg-pink-100 rounded-lg items-center cursor-pointer relative hover:bg-pink-50'
            onClick={(e) => addHeart(e, 'request gift box')}
          >
            <RectangleEllipsis className='mr-1' />
            <span className='hidden md:block'>Yêu cầu</span>
            <span className='absolute -top-2 -right-1 bg-pink-800 px-2 text-white text-sm rounded-full'>2</span>
          </div>
        </div>
      </div>

      {isOpenModal === 'shopping cart' && <ModalShopCart setIsOpenModal={setIsOpenModal} />}
      {isOpenModal === 'bought' && <ModalBought setIsOpenModal={setIsOpenModal} />}
      {isOpenModal === 'request gift box' && <ModalRequestGiftbox setIsOpenModal={setIsOpenModal} />}
    </div>
  )
}
