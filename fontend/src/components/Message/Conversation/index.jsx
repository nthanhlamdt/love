import { motion } from 'framer-motion'
import InforMessage from './InforMessage'
import InputMessage from './InputMessage'
import ChatBubble from './ChatBubble'
import { useMessageContext } from '~/context/messageContext'
import { useAuthContext } from '~/context/authContext'

export default function Conversation({ messageRef }) {
  const { messages } = useMessageContext()
  const { authUser } = useAuthContext()

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
        {messages.map(message => {
          return (
            <ChatBubble
              key={message._id} // Đảm bảo mỗi phần tử có `key` duy nhất
              message={message.message}
              type={message.sendId === authUser._id ? 'send' : 'receiver'}
            />
          )
        })}
      </div>
      <InputMessage />
    </motion.div>
  )
}
