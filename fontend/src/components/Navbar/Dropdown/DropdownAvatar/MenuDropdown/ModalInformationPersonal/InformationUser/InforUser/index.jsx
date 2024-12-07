import { motion } from 'framer-motion'
export default function InforUser({ Icon, lable, value }) {
  return (
    <motion.div
      className='flex items-center px-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className='p-2 bg-pink-200 rounded-full mr-3'><Icon /></span>
      <div className='flex flex-col items-start'>
        <lable className='text-xs'>{lable}</lable>
        <span className="text-md font-semibold">{ value }</span>
      </div>
    </motion.div>
  )
}
