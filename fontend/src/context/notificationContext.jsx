/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { createContext, useContext, useEffect, useState } from 'react'
import { getNotification } from '../api/api'
import { useSocketContext } from './SocketContext'
import notificationSound from '/sound/notificationSound.mp3'
import { useAuthContext } from './authContext'

export const NotificationContext = createContext()

export const useNotificationContext = () => {
  return useContext(NotificationContext)
}

export const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [quanlityNotification, setQuanlityNotification] = useState(0)
  const { socket } = useSocketContext()
  const { authUser } = useAuthContext()

  // Lấy thông báo khi component mount
  useEffect(() => {
    if (authUser) {
      getNotification()
        .then((data) => {
          setNotifications(data.notifications)
          setQuanlityNotification(data.quanlityNotification)
        })
        .catch((error) => {
          console.error('Error fetching notifications:', error)
        })
    }
  }, [])

  // Lắng nghe thông báo mới từ server qua socket
  useEffect(() => {
    if (!socket) return

    const handleNewNotification = (notification) => {
      const sound = new Audio(notificationSound)
      sound.play()
      setNotifications((prevNotifications) => [notification, ...prevNotifications])
    }

    socket.on('newNotification', handleNewNotification)

    // Cleanup khi component unmount hoặc khi socket thay đổi
    return () => {
      socket.off('newNotification', handleNewNotification)
    }
  }, [socket])

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, quanlityNotification, setQuanlityNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
