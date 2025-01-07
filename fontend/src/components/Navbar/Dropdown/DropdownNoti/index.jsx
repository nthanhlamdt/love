import { FaBell } from 'react-icons/fa'
import Notifications from './Notifications'
import { useNotificationContext } from '../../../../context/notificationContext'
import { readingNotification } from '../../../../api/api'

function DropdownNotification({
  notificationDropdownRef,
  setIsAvatarDropdownOpen,
  setIsNotificationDropdownOpen,
  isNotificationDropdownOpen
}) {
  const { quanlityNotification, setQuanlityNotification, notifications, setNotifications } = useNotificationContext()

  const handleOpenNotification = async () => {
    setQuanlityNotification(0)
    setIsAvatarDropdownOpen(false)
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
    await Promise.all(
      notifications.map(notification =>
        readingNotification({ idNotification: notification._id, status: notification.status == 'unread' ? 'see' : notification.status })
          .then(data => setNotifications(prevNotifications => {
            return prevNotifications.map(n => {
              if (n._id === data._id) {
                return { ...n, status: data.status }
              }
              return n
            })
          }))
      )
    )
  }

  return (
    <>
      <div ref={notificationDropdownRef} className='relative z-[99]'>
        <div
          ref={notificationDropdownRef}
          className='relative cursor-pointer rounded-full bg-pink-500 hover:bg-pink-400 w-8 h-8 flex items-center justify-center mx-3'
          onClick={handleOpenNotification}
        >
          <FaBell />
          {quanlityNotification !== 0 &&
            <span
              className='text-sm absolute -top-2 right-1 w-5 h-5 bg-red-600 flex items-center justify-center rounded-full border-2 border-pink-400'
            >{quanlityNotification}</span>}
        </div>
        {isNotificationDropdownOpen && <Notifications />}
      </div>
    </>
  )
}

export default DropdownNotification
