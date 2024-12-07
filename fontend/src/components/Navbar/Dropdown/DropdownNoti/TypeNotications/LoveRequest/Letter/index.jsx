import { useState } from 'react'
import { toast } from 'react-toastify'
import { readingNotification, sendNotification, setLove } from '../../../../../../../api/api'
import { useNotificationContext } from '../../../../../../../context/notificationContext'

export default function Letter({ notification }) {
  const [isOpen, setIsOpen] = useState(false)
  const timeSend = new Date(notification.createdAt)
  const { setNotifications } = useNotificationContext()

  const onSetLove = async (status, sendId, loveDate, notificationId) => {
    try {
      const data = await setLove({ status, sendId, loveDate, notificationId })
      await updateStatusNotification()

      if (status === 'accept') {
        await sendNotification({
          phoneNumber: data.user.phoneNumber,
          type: 'event',
          title: 'đã đồng ý yêu cầu ghép đôi với bạn',
          loveDate: '',
          message: ''
        })
      }

      else {
        await sendNotification({
          phoneNumber: data.userSend.phoneNumber,
          type: 'event',
          title: 'đã từ chối yêu cầu ghép đôi của bạn',
          loveDate: '',
          message: ''
        })
      }

      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Đã xảy ra lỗi không xác định')
    }
  }

  const updateStatusNotification = () => {
    readingNotification({ idNotification: notification._id, status: 'pending' })
      .then((data) => {
        setNotifications(prevNotifications => {
          return prevNotifications.map(notification => {
            if (notification._id === data._id) {
              return { ...notification, status: data.status }
            }
            return notification
          })
        })
        toast.success(data)
      })
  }
  return (
    <div className='max-w-96 mx-auto border border-pink-300 rounded-lg overflow-hidden shadow-lg'>
      <div
        className={`cursor-pointer p-4 bg-pink-400 flex items-center justify-between ${
          isOpen ? 'rounded-b-none' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex items-center gap-2'>
          <div className='avatar'>
            <div className='ring-primary ring-offset-base-100 w-12 rounded-full'>
              <img src={notification.senderId.avatar} />
            </div>
          </div>
          <div className='grid gap-0.5 leading-none'>
            <div className='font-semibold text-white'>{notification.senderId.fullName}</div>
            <div className='text-sm text-white'>Gửi lúc {timeSend.getHours() + ':' + timeSend.getMinutes()}</div>
          </div>
        </div>
        <button className='bg-transparent border-0 p-0' onClick={() => setIsOpen(!isOpen)}>
          <ChevronDownIcon className={`w-4 h-4 text-pink-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen p-4 bg-pink-50' : 'max-h-0'
        }`}
      >
        <div className='space-y-4'>
          <div className='text-sm text-pink-700 flex items-center justify-around'>
            <img
              src='/public/assets/send_letter.png'
              alt='Thư'
              className='w-20'
            />
            <p className='ml-3 text-lg font-bold'>{notification.message}</p>
            <img
              src='/public/assets/send_letter.png'
              alt='Thư'
              className='w-20'
            />
          </div>

          <div className='flex justify-end gap-2 mt-4'>
            {notification.status !== 'pending' ? (
              <div>
                <button
                  className='px-4 py-2 mr-4 border border-pink-300 rounded-md text-pink-700 hover:bg-pink-100'
                  onClick={() => onSetLove('refusal', notification.senderId, notification.loveDate, notification._id)}
                >
                  Từ chối
                </button>

                <button
                  className='px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600'
                  onClick={() => onSetLove('accept', notification.senderId, notification.loveDate, notification._id)}
                >
                  Chấp nhận
                </button>
              </div>
            ): <></>}

          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m6 9 6 6 6-6' />
    </svg>
  )
}

// eslint-disable-next-line no-unused-vars
function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  )
}