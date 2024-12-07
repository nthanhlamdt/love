import SenderMessage from './SenderMessage'
import { motion } from 'framer-motion'
import InforMessage from './InforMessage'
import ResiverMessage from './ResiverMessage'
import InputMessage from './InputMessage'

export default function Conversation({ messageRef }) {
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
      className='fixed max-h-[70%] min-h-80 flex flex-col justify-between right-5 bottom-40 w-[380px] p-2 pb-0 bg-white rounded-lg shadow-xl border border-pink-100 h-[600px]'
    >
      <InforMessage />
      <div className='flex-1 flex flex-col-reverse my-2 overflow-auto min-h-[300px]'>
        <ResiverMessage />
        <SenderMessage />
        <ResiverMessage />
        <ResiverMessage />
        <ResiverMessage />
        <ResiverMessage />
        <ResiverMessage />
        <ResiverMessage />
        <ResiverMessage />
        <ResiverMessage />
        <ResiverMessage />
        <ResiverMessage />
        <ResiverMessage />
        <ResiverMessage />
      </div>
      <InputMessage />
    </motion.div>
  )
}
