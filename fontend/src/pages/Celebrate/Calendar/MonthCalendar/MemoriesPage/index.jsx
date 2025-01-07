import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import confetti from 'canvas-confetti'
import { ChevronLeft, Gift } from 'lucide-react'
import AddMemoryModal from './AddMemoryModal'
import { Link, useParams } from 'react-router-dom'
import { getYearlyMemory } from '~/api/api'
import MemoriesDetailModal from './MemoriesDetailModal'

export default function EnhancedAnniversaryPage() {
  const [isConfettiActive, setIsConfettiActive] = useState(false)
  const [isFireworksActive, setIsFireworksActive] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [anniversaryEvents, setAnniversaryEvents] = useState([])
  const [indexDetail, setIndexDetail] = useState(0)

  const { id } = useParams()
  const containerRef = useRef(null)

  useEffect(() => {
    if (isConfettiActive) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          clearInterval(interval)
          setIsConfettiActive(false)
          return
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }))
      }, 250)

      return () => clearInterval(interval)
    }
  }, [isConfettiActive])

  useEffect(() => {
    if (isFireworksActive) {
      const duration = 5 * 1000
      const animationEnd = Date.now() + duration

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          clearInterval(interval)
          setIsFireworksActive(false)
          return
        }

        const particleCount = 30
        const angle = Math.random() * Math.PI * 2
        confetti({
          particleCount,
          angle,
          spread: 60,
          origin: { x: Math.random(), y: Math.random() },
          colors: ['#ff0066', '#ff99cc', '#ff66b2', '#ff3399', '#ff80ff']
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [isFireworksActive])

  const handleEventClick = (index) => {
    setIsConfettiActive(true)
    setIsFireworksActive(true)
    setShowDetailModal(true)
    setIndexDetail(index)
  }

  useEffect(() => {
    getYearlyMemory({ memoryId: id })
      .then(data => {
        setAnniversaryEvents(data)
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error('lỗi getYearlyMemory: ', e.message)
      })
  }, [id])

  // Validate and format the date safely
  const formatDate = (date) => {
    const eventDate = new Date(date)
    if (eventDate instanceof Date && !isNaN(eventDate)) {
      return format(eventDate, 'dd MMMM', { locale: vi })
    }
    return 'Invalid date'
  }

  return (
    <div className='bg-pink-100'>
      <motion.div
        ref={containerRef}
        className='min-h-screen p-8 overflow-hidden container mx-auto'
      >
        <Link className='inline-flex text-pink-400' to='/celebrate'>
          <ChevronLeft />
          <span>Quay lại lịch kỉ niệm</span>
        </Link>

        <motion.div
          className='max-w-4xl mx-auto text-center mb-12'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <motion.h1
            className='text-5xl md:text-6xl font-bold text-pink-600 mb-4'
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {anniversaryEvents.length > 0 && anniversaryEvents[0]?.name
              ? anniversaryEvents[0]?.name
              : 'Ngày kỉ niệm không xác định'}
          </motion.h1>

          <motion.p
            className='text-xl text-pink-600 mb-4'
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {anniversaryEvents.length > 0 && anniversaryEvents[0]?.description
              ? anniversaryEvents[0]?.description
              : 'Ngày kỉ niệm không xác định'}
          </motion.p>

          <motion.p
            className='text-2xl font-semibold text-pink-700'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {anniversaryEvents.length > 0 && anniversaryEvents[0]?.memoryId?.date
              ? formatDate(anniversaryEvents[0]?.memoryId?.date)
              : 'Ngày kỉ niệm không xác định'}
          </motion.p>
        </motion.div>

        <motion.div
          className='flex justify-center mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button
            className='bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-3 flex items-center'
            onClick={() => containerRef.current?.scrollIntoView({ behavior: 'smooth' })}
          >
            Khám phá hành trình của chúng ta
            <svg className='ml-2 h-5 w-5 animate-bounce' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
            </svg>
          </button>
        </motion.div>

        <div className='relative max-w-3xl mx-auto'>
          <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-pink-300 transform -translate-x-1/2' />
          <AnimatePresence>
            {anniversaryEvents.map((event, index) => (
              <motion.div
                key={event._id}
                className={`mb-16 flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-full max-w-lg ${index % 2 === 0 ? 'mr-4' : 'ml-4'} bg-[rgba(255,255,255,0.3)] backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg`}>
                  <div className='p-6'>
                    <motion.div
                      className='flex items-center mb-4'
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <svg className='w-6 h-6 text-pink-500 mr-2' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                        <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
                        <line x1='16' y1='2' x2='16' y2='6' />
                        <line x1='8' y1='2' x2='8' y2='6' />
                        <line x1='3' y1='10' x2='21' y2='10' />
                      </svg>
                      <h2 className='text-2xl font-semibold text-pink-800'>{event.year}</h2>
                    </motion.div>
                    <motion.h3
                      className='text-xl font-medium text-pink-700 mb-2'
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      {event.name}
                    </motion.h3>
                    <motion.p
                      className='text-pink-600 mb-4 line-clamp-2'
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      {event.description}
                    </motion.p>
                    <button
                      className='w-full justify-center items-center bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 rounded-md px-4 py-2 flex'
                      onClick={() => handleEventClick(index)}
                    >
                      <svg className='w-4 h-4 mr-2' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                      </svg>
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          className='fixed bottom-40 right-6 p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600'
          onClick={() => setShowAddModal(true)}
        >
          <Gift size={25}/>
        </button>

        {/* Add Memory Modal */}
        {showAddModal && (
          <AddMemoryModal setShowAddModal={setShowAddModal} />
        )}

        {showDetailModal && (
          <MemoriesDetailModal
            anniversaryEvent={anniversaryEvents[indexDetail]}
            setShowDetailModal={setShowDetailModal}
          />
        )}
      </motion.div>
    </div>
  )
}
