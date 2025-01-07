'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

export default function MemoryGallery({ listTimeMachines }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listTimeMachines.length)
  }, [listTimeMachines.length])

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + listTimeMachines.length) % listTimeMachines.length)
  }, [listTimeMachines.length])

  useEffect(() => {
    const timer = setTimeout(goToNext, 5000)
    return () => clearTimeout(timer)
  }, [currentIndex, goToNext])

  if (!listTimeMachines || listTimeMachines.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-pink-600 mb-4">Kỷ niệm của chúng ta</h2>
          <p className="text-xl text-gray-600">Không có kỷ niệm nào được tìm thấy.</p>
        </div>
      </div>
    )
  }

  const currentMemory = listTimeMachines[currentIndex]

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  }

  const contentVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '50%' : '-50%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '50%' : '-50%',
      opacity: 0
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 h-[70%] flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-auto overflow-hidden relative rounded-2xl shadow-2xl h-[70vh] bg-[rgba(255,255,255,0.2)] backdrop-blur-md">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="flex flex-col-reverse md:flex-row items-stretch h-full absolute w-full"
          >
            <motion.div
              className="md:w-1/2 p-8 flex flex-col justify-center"
              variants={contentVariants}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              <h2 className="text-4xl md:text-4xl px-5 lg:text-5xl xl:text-6xl font-bold mb-1 text-wrap text-pink-600 leading-tight">
                {currentMemory.name}
              </h2>

              <p className="text-xl md:text-xl px-5 text-pink-600 mb-2 leading-relaxed">
                {currentMemory.description}
              </p>

              <div className="flex items-center justify-center bg-pink-100 rounded-lg p-4 shadow-md">
                <Calendar className="mr-3 text-pink-500" size={28} />
                <p className="text-xl font-semibold text-pink-600">
                  {new Date(currentMemory.time).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 relative overflow-hidden rounded-r-2xl"
              variants={contentVariants}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              <img
                src={currentMemory.image}
                alt={currentMemory.name}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-[rgba(236,72,153,0.1)] text-white rounded-full hover:bg-pink-600 transition-colors focus:outline-none hover:ring-2 ring-pink-400 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Kỷ niệm trước"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-[rgba(236,72,153,0.1)] text-white rounded-full hover:bg-pink-600 transition-colors focus:outline-none hover:ring-2 ring-pink-400 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Kỷ niệm tiếp theo"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </div>
  )
}

