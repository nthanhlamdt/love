import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ShoppingBag, Heart, RefreshCw, ImageIcon, X } from 'lucide-react'

export default function ModalBought({ setIsOpenModal }) {
  const [purchasedItems, setPurchasedItems] = useState([
    {
      id: 1,
      name: 'Hộp quà Yêu thương vô hạn',
      price: 199,
      purchaseDate: '2023-05-15',
      image: '/placeholder.svg',
      rating: 5,
      photos: ['/placeholder.svg', '/placeholder.svg']
    },
    {
      id: 2,
      name: 'Bó hoa Nụ cười của em',
      price: 89,
      purchaseDate: '2023-06-01',
      image: '/placeholder.svg',
      rating: 4,
      photos: ['/placeholder.svg']
    },
    {
      id: 3,
      name: 'Thiệp Trái tim của anh',
      price: 29,
      purchaseDate: '2023-06-10',
      image: '/placeholder.svg',
      rating: 5,
      photos: []
    }
  ])

  const [selectedItem, setSelectedItem] = useState(null)

  const handleRating = (id, newRating) => {
    setPurchasedItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, rating: newRating } : item
      )
    )
  }

  const togglePhotoView = (item) => {
    setSelectedItem(item === selectedItem ? null : item)
  }

  return (
    <div className='z-[999] fixed inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center p-8'>
      <div className='relative max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden'>
        <X className='absolute right-5 top-5 cursor-pointer' onClick={() => setIsOpenModal('')}/>
        <div className='p-6'>
          <h1 className='text-3xl font-bold text-center mb-8 text-pink-600'>Kỷ Niệm Yêu Thương</h1>
          <AnimatePresence>
            {purchasedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='bg-white p-4 rounded-lg shadow mb-4 hover:shadow-md transition-shadow'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-4'>
                    <img src={item.image} alt={item.name} className='w-20 h-20 rounded-md' />
                    <div>
                      <h3 className='font-semibold text-lg'>{item.name}</h3>
                      <p className='text-pink-500 font-medium'>{item.price.toLocaleString()} đ</p>
                      <p className='text-sm text-gray-500'>Mua ngày: {item.purchaseDate}</p>
                    </div>
                  </div>
                  <div className='flex flex-col items-end space-y-2'>
                    <div className='flex items-center'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 cursor-pointer ${
                            star <= item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                          onClick={() => handleRating(item.id, star)}
                        />
                      ))}
                    </div>
                    <div className='flex space-x-2'>
                      <button
                        className='flex items-center space-x-1 text-pink-600 hover:bg-pink-50 px-3 py-1 border rounded'
                      >
                        <RefreshCw className='h-4 w-4' />
                        <span>Mua lại</span>
                      </button>
                      <button
                        onClick={() => togglePhotoView(item)}
                        className='flex items-center space-x-1 text-blue-600 hover:bg-blue-50 px-3 py-1 border rounded'
                      >
                        <ImageIcon className='h-4 w-4' />
                        <span>{selectedItem === item ? 'Ẩn ảnh' : 'Xem ảnh'}</span>
                      </button>
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {selectedItem === item && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className='mt-4'
                    >
                      {item.photos.length > 0 ? (
                        <div className='grid grid-cols-2 gap-4'>
                          {item.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`${item.name} - Ảnh ${index + 1}`}
                              className='rounded-lg object-cover w-full h-full'
                            />
                          ))}
                        </div>
                      ) : (
                        <div className='text-center py-8 text-gray-500'>
                          <ImageIcon className='mx-auto h-16 w-16 mb-4 text-pink-300' />
                          <p className='text-xl'>Chưa có ảnh cho món quà này</p>
                          <p className='mt-2'>Hãy chụp những khoảnh khắc đáng nhớ với món quà của bạn!</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
          {purchasedItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center py-8 text-gray-500'
            >
              <ShoppingBag className='mx-auto h-16 w-16 mb-4 text-pink-300' />
              <p className='text-xl'>Bạn chưa mua món quà nào</p>
              <p className='mt-2'>Hãy chọn những món quà ý nghĩa để thể hiện tình yêu của bạn!</p>
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
