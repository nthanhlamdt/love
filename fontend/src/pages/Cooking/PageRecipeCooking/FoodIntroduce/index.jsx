import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChefHat, Clock, ConciergeBell, CookingPot, ChevronUp, ChevronDown } from 'lucide-react'

export default function FoodIntroduce() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleScroll = (e, value) => {
    e.preventDefault()
    const section = document.getElementById(value)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const images = [
    'https://res.cloudinary.com/ddb9h61me/image/upload/v1730907677/love_image/r0ksp3el3zfm3vzuugiw.jpg',
    'https://res.cloudinary.com/ddb9h61me/image/upload/v1730908143/love_image/hwdom3qypsujqk3saoh0.jpg',
    'https://res.cloudinary.com/ddb9h61me/image/upload/v1730902578/love_image/jyfxcfrhvizzpri2vo56.webp',
    'https://res.cloudinary.com/ddb9h61me/image/upload/v1730902579/love_image/amml0mmijpntle7rth2w.jpg',
    'https://res.cloudinary.com/ddb9h61me/image/upload/v1730902933/love_image/dtsijo07yscccll32orb.jpg'
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const getThumbnailIndices = () => {
    const indices = []
    for (let i = 0; i < 4; i++) {
      indices.push((currentImageIndex + i) % images.length)
    }
    return indices
  }

  return (
    <div className='flex flex-col lg:flex-row justify-between items-start w-full mt-5'>
      <div className='w-full mr-10 lg:w-[40%]'>
        <h2 className='font-bold lg:text-4xl text-5xl text-pink-700'>Lẩu thái chua cay</h2>
        <p className='text-justify my-5 lg:text-md xl:text-lg'>Lẩu Thái chua cay là một món ăn đặc trưng của nền ẩm thực Thái Lan, nổi bật với sự kết hợp hài hòa giữa các vị chua, cay, mặn và ngọt, mang đến một hương vị đậm đà và kích thích vị giác. Món lẩu này rất phổ biến và được yêu thích ở nhiều nơi</p>
        <div className='flex'>
          <div className='flex items-center'>
            <Clock className='mr-2'/>
            90 phút
          </div>
          <div className='flex items-center ml-3'>
            <ConciergeBell className='mr-2'/>
            2-3 người ăn
          </div>
        </div>
        <div className='mt-5 flex items-center'>
          <button className='lg:text-sm w-[50%] mr-3 bg-pink-600 rounded-full font-semibold text-white hover:bg-pink-700'>
            <a href='#ingredient' className='flex py-3 items-center justify-center' onClick={(e) => handleScroll(e, 'ingredient')}>
              <CookingPot className='mr-2 ' />Thành phần
            </a>
          </button>
          <button className='lg:text-sm w-[50%] rounded-full text-pink-600 font-semibold border border-pink-600 hover:bg-pink-100'>
            <a href='#cooking' className='flex py-3 items-center justify-center' onClick={(e) => handleScroll(e, 'cooking')}>
              <ChefHat className='mr-2' />Cách nấu
            </a>
          </button>
        </div>
      </div>

      <div className='lg:max-h-96 flex flex-col lg:flex-row w-full lg:w-[60%] gap-4'>
        <div className='relative w-full lg:w-[70%] mt-10 lg:mt-0'>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
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
            <ChevronUp className="rotate-90" />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
            aria-label="Next image"
          >
            <ChevronDown className="-rotate-90" />
          </button>
        </div>

        <div className='grid grid-cols-4 lg:grid-cols-1 gap-2 w-full h-[120px] lg:h-auto lg:w-[30%]'>
          {getThumbnailIndices().map((index) => (
            <motion.div
              key={index}
              className={`aspect-square overflow-hidden rounded-lg cursor-pointer transition-all ${
                currentImageIndex === index ? 'ring-2 ring-pink-600' : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => setCurrentImageIndex(index)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={images[index]}
                alt={`Lẩu thái chua cay thumbnail ${index + 1}`}
                className='w-full h-[120px] lg:h-auto object-cover object-center'
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}