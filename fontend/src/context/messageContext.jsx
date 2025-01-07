/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-console */
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getMessage } from '../api/api'
import { useSocketContext } from './SocketContext'
import messageSound from '/sound/messageSound.mp3'
import { useAuthContext } from './authContext'

export const MessageContext = createContext()

export const useMessageContext = () => {
  return useContext(MessageContext)
}

export const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [quanlityMessages, setQuanlityMessages] = useState(0)

  const { socket } = useSocketContext()
  const { authUser } = useAuthContext()
  const userLove = JSON.parse(localStorage.getItem('userLove'))
  const hasFetchedMessages = useRef(false)

  useEffect(() => {
    // Kiểm tra nếu authUser và userLove đã có giá trị và chưa tải tin nhắn
    if (authUser && userLove && !hasFetchedMessages.current) {
      getMessage()
        .then((data) => {
          if (data) {
            setQuanlityMessages(messages.filter(message => message.status === 'unread').length)
            setMessages(data)
          }
        })
        .catch((error) => {
          console.error('Error fetching message:', error)
        })

      hasFetchedMessages.current = true
    }
  }, [authUser, messages, userLove])

  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (message) => {
      const sound = new Audio(messageSound)
      sound.play()
      setMessages((prev) => [message, ...prev])
      setQuanlityMessages(prev => prev + 1)
    }

    socket.on('newMessage', handleNewMessage)

    // Cleanup khi component unmount hoặc khi socket thay đổi
    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [socket])

  return (
    <MessageContext.Provider value={{ messages, setMessages, quanlityMessages, setQuanlityMessages }}>
      {children}
    </MessageContext.Provider>
  )
}
