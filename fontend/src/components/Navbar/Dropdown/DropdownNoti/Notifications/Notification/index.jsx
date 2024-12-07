import { useState } from 'react'
import LoveRequest from '../../TypeNotications/LoveRequest'
import { readingNotification } from '../../../../../../api/api'
import { useNotificationContext } from '../../../../../../context/notificationContext'

export default function Notification({ notification }) {
  const [handleOpenModal, setHandleOpenModal] = useState(false)
  const { setNotifications } = useNotificationContext()

  const handleSelectNotification = async () => {
    if (notification.type === 'love_request') {
      setHandleOpenModal(true)
    }

    if (notification.status === 'see') {
      const data = await readingNotification({ idNotification: notification._id, status: 'read' })
      setNotifications(prevNotifications => {
        return prevNotifications.map(n => {
          if (n._id === data._id) {
            return { ...n, status: data.status }
          }
          return n
        })
      })
    }
  }

  return (
    <>
      <li
        className={`text-white ${notification.status === 'see' ? 'bg-pink-500' : 'bg-pink-400'} hover:bg-pink-600 w-full cursor-pointer flex py-2 px-2 items-center justify-around`}
        onClick={handleSelectNotification}
      >
        <div className="avatar mr-2">
          <div className="ring-primary ring-offset-base-100 w-12 rounded-full">
            <img src={notification.senderId.avatar} alt={notification.senderId.fullName} />
          </div>
        </div>
        <div><b>{notification.senderId.fullName}</b> {notification.title}</div>
        {notification.status === 'Sent' && <div className='w-2 h-2 bg-blue-500 rounded-full'></div>}
      </li>

      {handleOpenModal && notification.type === 'love_request' && (
        <LoveRequest notification={notification} setHandleOpenModal={setHandleOpenModal} />
      )}
    </>
  )
}
