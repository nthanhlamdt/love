import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FoodThumbnailIndices({ cookings }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % cookings.length)
    navigate(`/cooking/${cookings[currentImageIndex]._id}`)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + cookings.length) % cookings.length)
    navigate(`/cooking/${cookings[currentImageIndex]._id}`)
  }

  const getThumbnailIndices = useMemo(() => {
    const indices = []
    const totalImages = cookings.length
    const maxThumbnails = 4

    // Tạo một mảng chỉ số tối đa 4, nếu tổng số ảnh ít hơn 4 thì lấy đủ
    for (let i = 0; i < Math.min(maxThumbnails, totalImages); i++) {
      indices.push((currentImageIndex + i) % totalImages)
    }

    return indices
  }, [currentImageIndex, cookings.length])

  return (
    <div className='lg:max-h-96 flex flex-col lg:flex-row w-full lg:w-[60%] gap-4'>
      <div className='relative w-full mt-10 lg:mt-0'>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={cookings[currentImageIndex].image}
            alt={`Lẩu thái chua cay ${currentImageIndex + 1}`}
            className='w-full h-[450px] lg:h-full object-cover object-center rounded-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
          aria-label="Next image"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Chỉ hiển thị phần thumbnails nếu mảng có hơn 1 ảnh */}
      {cookings.length > 1 && (
        <div className='grid grid-cols-4 lg:grid-cols-1 gap-2 w-full h-[120px] lg:h-auto lg:w-[30%]'>
          {getThumbnailIndices.map((index) => (
            <motion.div
              key={index}
              className={`aspect-square overflow-hidden rounded-lg cursor-pointer transition-all ${currentImageIndex === index ? 'ring-2 ring-pink-600' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => setCurrentImageIndex(index)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={cookings[index].image}
                alt={cookings[index].name}
                className='w-full h-[120px] lg:h-auto object-cover object-center'
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
