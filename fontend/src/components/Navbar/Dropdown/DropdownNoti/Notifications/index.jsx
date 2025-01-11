import { useNotificationContext } from '../../../../../context/notificationContext'
import DontNotification from '../DontNotification'
import Notification from './Notification'

const Notifications = () => {
  const { notifications } = useNotificationContext()
  return (
    <ul className="max-h-96 bg-pink-400 rounded-lg w-80 shadow absolute -right-10 top-12 overflow-auto">
      <h2 className='p-3 font-semibold text-xl'>Thông báo</h2>
      <hr/>
      {notifications.length !== 0 ? (
        notifications.map((notification) => (
          <Notification key={notification._id} notification={notification} />
        ))
      ) : (
        <DontNotification />
      )}
    </ul>
  )
}

export default Notifications
