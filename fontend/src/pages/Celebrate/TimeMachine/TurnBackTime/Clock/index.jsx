import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Clock = ({ selectedCalendar, setSelectedCalendar, statusTime }) => {
  const [rotation, setRotation] = useState({ hour: 0, minute: 0, second: 0 })

  useEffect(() => {
    if (!selectedCalendar) {
      // Giảm giá trị quay để tạo hiệu ứng quay ngược
      setRotation(prev => ({
        hour: statusTime ? prev.hour + 360 * 6: prev.hour -360 * 6, // Quay ngược 2 vòng (720 độ) cho kim giờ
        minute: statusTime ? prev.minute + 360 * 6 * 60 : prev.minute - 360 * 6 * 60, // Quay ngược 2 vòng cho kim phút
        second: statusTime ? prev.second + 360 * 6 * 60 * 60 :prev.second -360 * 6 * 60 * 60 // Quay ngược 2 vòng cho kim giây
      }))
    }
  }, [selectedCalendar])

  useEffect(() => {
    if (statusTime === true) {
      const timer = setTimeout(() => {
        setSelectedCalendar(statusTime)
      }, 7500)

      return () => clearTimeout(timer)
    }
  })
  return (
    <div className="relative w-64 h-64">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#FFC0CB" stroke="#FF69B4" strokeWidth="2" />
        {[...Array(12)].map((_, i) => (
          <text
            key={i}
            x="50"
            y="20"
            fontSize="6"
            textAnchor="middle"
            fill="#FF1493"
            transform={`rotate(${i * 30} 50 50)`}
          >
            {i === 0 ? 12 : i}
          </text>
        ))}
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          stroke="#FF1493"
          strokeWidth="3"
          initial={false}
          animate={{ rotate: rotation.hour }}
          transition={{ duration: 7 }}
          style={{ originX: '50px', originY: '50px' }}
        />
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="#FF1493"
          strokeWidth="2"
          initial={false}
          animate={{ rotate: rotation.minute }}
          transition={{ duration: 7 }}
          style={{ originX: '50px', originY: '50px' }}
        />
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="#FF69B4"
          strokeWidth="1"
          initial={false}
          animate={{ rotate: rotation.second }}
          transition={{ duration: 7 }}
          style={{ originX: '50px', originY: '50px' }}
        />
      </svg>
    </div>
  )
}

export default Clock
