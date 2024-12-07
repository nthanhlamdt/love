import { MessageCircleMore } from 'lucide-react'
import Conversation from './Conversation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function Message() {
  const [isOpenConversation, setIsOpenConversation] = useState(false)

  const messageRef = useRef(null)
  const messageButtonRef = useRef(null)

  const handleClickOutside = (e) => {
    if (messageRef.current && !messageRef.current.contains(e.target) && messageButtonRef.current && !messageButtonRef.current.contains(e.target)) {
      setIsOpenConversation(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className='z-[9999] '>
      <AnimatePresence >
        {isOpenConversation && <Conversation messageRef={messageRef} />}
      </AnimatePresence>

      <button
        className="fixed flex justify-center items-center bottom-24 right-5 rounded-full w-12 h-12 bg-pink-500 hover:bg-pink-600 shadow-lg"
        size="icon"
        ref={messageButtonRef}
        onClick={() => setIsOpenConversation(!isOpenConversation)}
      >
        <MessageCircleMore className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
