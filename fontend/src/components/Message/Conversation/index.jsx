import { motion } from 'framer-motion'
import InforMessage from './InforMessage'
import InputMessage from './InputMessage'
import ChatBubble from './ChatBubble'

export default function Conversation({ messageRef, type }) {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1
      }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      ref={messageRef}
      className='fixed max-h-[70%] overflow-hidden min-h-80 flex flex-col justify-between right-5 bottom-40 w-[380px] p-2 pb-0 bg-white rounded-lg shadow-xl border border-pink-100 h-[600px]'
    >
      <InforMessage />
      <div className='flex-1 flex flex-col-reverse my-2 overflow-auto'>
        <ChatBubble message={'ehllo'} type={'send'} />
        <ChatBubble message={'ehllo'} type={'resiver'} />
        <ChatBubble message={'ehllo'} type={'send'} />
        <ChatBubble message={'ehllo'} type={'send'} />
      </div>
      <InputMessage />
    </motion.div>
  )
}
