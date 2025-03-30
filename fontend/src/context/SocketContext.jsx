/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './authContext'
import io from 'socket.io-client'

const SocketContext = createContext()
const SOCKET_URL = 'https://love-server.onrender.com' // Đảm bảo URL đúng với server của bạn

export const useSocketContext = () => useContext(SocketContext)

export const SocketContextProvider = ({ children }) => {
  const { authUser } = useAuthContext()
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (authUser && authUser._id) {
      const socketIo = io(SOCKET_URL)

      socketIo.on('connect', () => {
        setIsConnected(true)
        // Sau khi kết nối thành công, gửi yêu cầu đăng ký người dùng
        socketIo.emit('register', authUser._id)
      })

      // Lưu socket vào state
      setSocket(socketIo)

      // Clean up khi component unmount
      return () => {
        socketIo.disconnect()
      }
    }
  }, [authUser]) // Phụ thuộc vào authUser

  // Hàm gửi tin nhắn
  const sendMessage = (to, message) => {
    if (socket && isConnected) {
      socket.emit('send_message', { to, message })
    }
  }

  return (
    <SocketContext.Provider value={{ socket, isConnected, sendMessage }}>
      {children}
    </SocketContext.Provider>
  )
}
