import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, X, ShoppingBag, Heart } from 'lucide-react'

export default function ModalShopCart({ setIsOpenModal }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Hộp quà Yêu thương vô hạn', price: 199, quantity: 1, image: '/placeholder.svg' },
    { id: 2, name: 'Bó hoa Nụ cười của em', price: 89, quantity: 1, image: '/placeholder.svg' },
    { id: 3, name: 'Thiệp Trái tim của anh', price: 29, quantity: 1, image: '/placeholder.svg' }
  ])

  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(newTotal)
  }, [cartItems])

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0)
    )
  }

  return (
    <div className='z-[999] fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] p-8'>
      <div className='relative max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden'>
        <X className='absolute right-5 top-5 cursor-pointer' onClick={() => setIsOpenModal('')}/>
        <div className='p-6'>
          <h1 className='text-3xl font-bold text-center mb-8 text-pink-600'>Giỏ Quà Yêu Thương</h1>
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4 hover:shadow-md transition-shadow'
              >
                <div className='flex items-center space-x-4'>
                  <img src={item.image} alt={item.name} className='w-20 h-20 rounded-md' />
                  <div>
                    <h3 className='font-semibold text-lg'>{item.name}</h3>
                    <p className='text-pink-500 font-medium'>{item.price.toLocaleString()} đ</p>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className='border rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100'
                  >
                    <Minus className='h-4 w-4' />
                  </button>
                  <span className='w-8 text-center'>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className='border rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100'
                  >
                    <Plus className='h-4 w-4' />
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                    className='text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full ml-2 p-1'
                  >
                    <X className='h-5 w-5' />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {cartItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center py-8 text-gray-500'
            >
              <ShoppingBag className='mx-auto h-16 w-16 mb-4 text-pink-300' />
              <p className='text-xl'>Giỏ quà của bạn đang trống</p>
              <p className='mt-2'>Hãy thêm những món quà ý nghĩa cho người thương nhé!</p>
            </motion.div>
          )}
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-8 space-y-4'
            >
              <div className='flex justify-between items-center font-semibold text-lg'>
                <span>Tổng cộng:</span>
                <span className='text-pink-600'>{total.toLocaleString()} đ</span>
              </div>
              <input
                type='text'
                placeholder='Nhập mã giảm giá'
                className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500'
              />
              <button className='w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md'>
                Tiến hành thanh toán
              </button>
              <p className='text-center text-sm text-gray-500 mt-4'>
                Mỗi món quà đều chứa đựng tình yêu của bạn
              </p>
            </motion.div>
          )}
        </div>
      </div>
      <motion.div
        className='fixed bottom-4 right-4'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button className='flex items-center justify-center rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg px-4 py-2'>
          <Heart className='mr-2 h-5 w-5' /> Yêu thương
        </button>
      </motion.div>
    </div>
  )
}
