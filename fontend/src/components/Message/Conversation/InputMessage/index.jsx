/* eslint-disable no-console */
import EmojiPicker from '@emoji-mart/react'
import { Send, SmilePlus } from 'lucide-react'
import { useState } from 'react'
import { sendMessage } from '~/api/api'
import { useMessageContext } from '~/context/messageContext'

export default function InputMessage() {
  const [isIcon, setIsIcon] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const { setMessages } = useMessageContext()

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (newMessage.trim()) {
        sendMessage(newMessage)
          .then(data => {
            setMessages(prev => ([data, ...prev]))
            setNewMessage('')
            console.log(data)
          })
          .catch(e => {
            console.error('lỗi gửi tin nhắn: ', e)
          })
      }
    }
  }

  const handleSubmitSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      sendMessage(newMessage)
        .then(data => {
          console.log(data)
          setNewMessage('')
        })
        .catch(e => {
          console.error('lỗi gửi tin nhắn: ', e)
        })
    }
  }

  return (
    <div className="py-4 px-2 border-t bg-white">
      <div className="flex items-center gap-2 relative">
        {isIcon &&
          <div className="w-full p-0 absolute bottom-10 -translate-x-0">
            <EmojiPicker
              onEmojiSelect={(emoji) => setNewMessage(prev => prev + emoji.native)}
              theme="light"
              locale="vi"
            />
          </div>
        }

        <button size="icon" className="text-pink-500" onClick={() => setIsIcon(!isIcon)}>
          <SmilePlus className="w-6 h-6" />
        </button>

        <input
          placeholder="Nhắn tin cho người yêu..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1  text-pink-600 py-1 px-2 rounded-md outline-none"
        />

        <button
          onClick={handleSubmitSendMessage}
          className=" h-full hover:bg-pink-500 hover:text-white text-pink-500 py-2 px-3 flex items-center justify-center rounded-md"
        >
          <Send size={20}/>
        </button>
      </div>
    </div>
  )
}
