import { useRef } from 'react'
import LoveRequest from './LoveRequest'
import Event from './Event'

export default function TypeNotifications({ setHandleOpenModal, notification, notificationType }) {
  const letterRef = useRef(null)

  const handleClickOutside = (event) => {
    if (letterRef.current && !letterRef.current.contains(event.target)) {
      setHandleOpenModal(false)
    }
  }

  return (
    <div
      className='fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.3)] z-[999]'
      onClick={handleClickOutside}
    >
      <div ref={letterRef} className="rounded-lg max-w-lg w-full">
        {notificationType === 'love_request' && <LoveRequest notification={notification} />}
        {notificationType === 'event' && <Event notification={notification} />}
      </div>
    </div>
  )
}
