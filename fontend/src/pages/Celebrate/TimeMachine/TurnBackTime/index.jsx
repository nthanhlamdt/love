import Clock from './Clock'
import DateDisplay from './DateDisplay'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function TurnBackTime({ selectedCalendar, statusTime, setSelectedCalendar }) {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(true)
  const [statusTimeout, setStatusTimeout] = useState(true)

  const startAnimation = () => {
    controls.start({
      scale: statusTime? [0, 0, 1] : [1, 0, 0], // Từ 1 thu nhỏ xuống 0
      rotate: [0, 360, 0], // Xoay từ 0 đến 360 độ
      opacity: statusTime? [0, 0, 1] : [1, 0, 0], // Từ nhìn thấy (1) đến trong suốt (0)
      borderRadius: ['0%', '50%', '0%'] // Đổi dạng
    }).then(() => {
      setStatusTimeout(false)
      setIsVisible(statusTime) // Đặt trạng thái không hiển thị sau khi hoàn tất animation
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation()
    }, statusTimeout ? 7000 : 200) // Bắt đầu hoạt động sau 7 giây

    return () => clearTimeout(timer) // Dọn dẹp khi component unmount
  })

  return (
    isVisible && (
      <div className='absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 opacity-50'>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={statusTime ? { scale: 0, rotate: 1, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
          animate={controls} // Sử dụng controls ở đây
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.5, 1]
          }}
        >
          <div className='flex flex-col items-center'>
            <DateDisplay
              selectedCalendar={selectedCalendar}
              statusTime={statusTime}
            />
            <Clock
              selectedCalendar={selectedCalendar}
              setSelectedCalendar={setSelectedCalendar}
              statusTime={statusTime}
            />
          </div>
        </motion.div>
      </div>
    )
  )
}
