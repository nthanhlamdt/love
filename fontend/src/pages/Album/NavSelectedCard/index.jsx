import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'


export default function NavSelectedCard({ selectedAlbums }) {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }} // Vị trí ban đầu và độ mờ
      animate={{ y: 0, opacity: 1 }} // Vị trí cuối cùng và độ mờ
      exit={{ y: -10, opacity: 0 }} // Vị trí và độ mờ khi thoát
      transition={{ duration: 0.5 }} // Thời gian chuyển tiếp
      className='flex items-center justify-between py-4 px-5 z-0 bg-pink-300 text-xl font-semibold'
    >
      <span>Có tất cả {selectedAlbums.length} lựa chọn</span>

      <div>
        <Trash2 />
      </div>
    </motion.div>
  )
}
