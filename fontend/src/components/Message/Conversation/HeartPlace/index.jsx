import { motion } from 'framer-motion'

export default function HeartPlace() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0], // Xuất hiện và biến mất
            scale: [0, 1, 0], // Phóng to và thu nhỏ
            x: Math.random() * 40 - 20, // Di chuyển theo chiều ngang
            y: Math.random() * -50 - 20, // Di chuyển theo chiều dọc
            rotate: Math.random() * 360 // Xoay ngẫu nhiên
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            delay: i * 0.4 // Hiệu ứng delay để mỗi trái tim xuất hiện sau một khoảng thời gian
          }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  )
}
