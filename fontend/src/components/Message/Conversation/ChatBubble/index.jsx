import { motion } from 'framer-motion'
import HeartPlace from '../HeartPlace'

export default function ChatBubble({ message, type }) {
  return (
    <motion.div
      className={`mt-2 flex ${type == 'send'? 'justify-end' : 'justify-start'} mb-y-1`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeartPlace />
      <div
        className={`relative max-w-[70%] ${type == 'send'? 'bg-pink-500 text-white' : 'bg-white text-pink-700'} p-2 px-3 rounded-2xl shadow-lg overflow-hidden`}
      >
        <p className="relative z-10 break-words whitespace-pre-wrap">{message}</p>
        <HeartPlace />
      </div>
    </motion.div>

  )
}
