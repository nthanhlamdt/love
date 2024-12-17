import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'


export default function DateScroll({ selectedCalendar, lable, numbers, runningTime, numberCurrent }) {
  const [spinning, setSpinning] = useState(selectedCalendar)
  const controls = useAnimation()

  const totalHeight = numbers.length * 100

  const spin = async () => {
    if (spinning) return // Nếu đang quay thì không thực hiện lại

    setSpinning(true)

    const randomResult = numberCurrent
    const targetY = -randomResult * 100 - 20

    await controls.start({
      y: [-totalHeight, targetY],
      transition: {
        duration: runningTime/1000,
        ease: 'easeOut' // Thay đổi easing cho tương thích
      }
    })

    setSpinning(false)
  }

  // Bắt đầu quay ngay khi component được mount
  useEffect(() => {
    spin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col items-center justify-center'>
      <span className='text-white font-semibold text-xl'>{ lable }</span>
      <div className="w-20 h-16 overflow-hidden mx-2 border-b-2">
        <motion.div
          animate={controls}
          className="flex flex-col items-center"
          style={{ y: 0 }}
        >
          {numbers.map((num, index) => (
            <div
              key={index}
              className="h-[100px] flex items-center justify-center text-3xl font-bold text-white"
            >
              {num}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
