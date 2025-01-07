import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import Card from './Card'
import { getTimeMachine } from '~/api/api'
import { toast } from 'react-toastify'

export default function CardMemorable({ statusTime, setStatusTime }) {
  const controls = useAnimation()
  const userLoveId = JSON.parse(localStorage.getItem('userLove'))._id
  const [listTimeMachines, setListTimeMachines] = useState([])

  useEffect(() => {
    getTimeMachine({ userLoveId })
      .then(data => {
        setListTimeMachines(data)
      })
      .catch(() => {
        toast.error('Lỗi lấy dữ liệu time machine')
      })
  }, [])
  const startAnimation = () => {
    controls.start({
      scale: statusTime? [1, 0, 0] : [0, 0, 1], // Từ 1 thu nhỏ xuống 0
      rotate: [0, 360, 0], // Xoay từ 0 đến 360 độ
      opacity: statusTime? [1, 0, 0] : [0, 0, 1], // Từ nhìn thấy (1) đến trong suốt (0)
      borderRadius: ['0%', '50%', '0%'] // Đổi dạng
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation()
    }, 200) // Bắt đầu hoạt động sau 7 giây

    return () => clearTimeout(timer) // Dọn dẹp khi component unmount
  })

  return (
    <div className='flex flex-col items-center justify-center'>
      <motion.div
        className="fixed inset-0 flex flex-col justify-center items-center text-white"
        initial={statusTime? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: 1, opacity: 0 }}
        animate={controls} // Sử dụng controls ở đây
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.5, 1]
        }}
      >

        {
          listTimeMachines.length > 0 && <Card listTimeMachines={listTimeMachines} />
        }

        <button
          className="py-3 mt-5  px-4 bg-pink-500 w-1/2 max-w-96 rounded-3xl font-bold"
          onClick={() => setStatusTime(!statusTime)} >
          Trở về hiện tại
        </button>
      </motion.div>
    </div>
  )
}
