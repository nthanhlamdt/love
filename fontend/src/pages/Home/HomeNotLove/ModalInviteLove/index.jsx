/* eslint-disable no-console */
import { useState } from 'react'
import { toast } from 'react-toastify'
import { sendNotification } from '../../../../api/api'

function ModalInviteLove() {
  const [data, setData] = useState({
    phoneNumber: '',
    message: '',
    type: 'love_request',
    title: ' yêu cầu ghép đôi với bạn',
    loveDate: ''
  })


  const submitRequestSetLove = async () => {
    console.log(data)
    if (!data.phoneNumber || !data.message || !data.loveDate) {
      return toast.error('Vui lòng nhập đầy đủ thông tin')
    }
    else {
      sendNotification(data)
        .then(() => {
          toast.success('Gửi yêu cầu thành công')
          setData({
            phoneNumber: '',
            type: 'love_request',
            message: '',
            title: ' đã yêu cầu ghép đôi với bạn'
          })
        })
        .catch(error => {
          toast.error(error?.response?.data?.error)
          setData({
            phoneNumber: '',
            type: 'love_request',
            message: '',
            title: ' đã yêu cầu ghép đôi với bạn'
          })
        })
    }
  }

  return (
    <dialog id='modal_invite_love' className='modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-70'>
      <div className='relative bg-pink-100 rounded-lg shadow-2xl max-w-lg w-full h-auto max-h-[90vh] overflow-auto'>
        {/* Background Decoration */}
        <div className='absolute inset-0 flex justify-center items-center'>
          <svg
            className='absolute inset-0 w-full h-full opacity-30'
            viewBox='0 0 200 200'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill='#f6a6b6' // Màu hồng đậm hơn
              d='M100 165l-50-50a35 35 0 0 1 0-50 35 35 0 0 1 50 0 35 35 0 0 1 50 0 35 35 0 0 1 0 50l-50 50z'
            />
          </svg>
        </div>

        {/* Modal Content */}
        <div className='relative z-10 p-8'>
          <h3 className='font-bold text-4xl text-pink-800 mb-6 text-center animate-fade-in'>
            Gửi yêu cầu kết nối
          </h3>

          <form method='dialog' className='flex flex-col gap-2'>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text text-pink-500'>Số Điện Thoại</span>
              </div>
              <input
                type='tel'
                pattern='[0-9]{10}'
                placeholder='+84'
                className='input input-bordered w-full'
                value={data.phoneNumber}
                onChange={e => setData({ ...data, phoneNumber: e.target.value })}
              />
            </label>

            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text text-pink-500'>Ngày Yêu</span>
              </div>
              <input
                type='date'
                className='input input-bordered w-full text-pink-500'
                value={data.loveDate}
                onChange={e => setData({ ...data, loveDate: e.target.value })}
              />
            </label>

            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text text-pink-500'>Lời Nhắn</span>
              </div>
              <textarea
                className='textarea textarea-bordered text-pink-500'
                placeholder='Lời nhắn bạn muốn gửi'
                value={data.message}
                onChange={e => setData({ ...data, message: e.target.value })}
              ></textarea>
            </label>


            {/* Buttons */}
            <div className='flex justify-center mt-6 gap-4'>
              <button
                onClick={submitRequestSetLove}
                type='submit'
                className='bg-pink-700 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-pink-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500'
              >
                Gửi yêu cầu
              </button>
              <button
                type='button'
                className='bg-gray-200 text-gray-800 py-2 px-6 rounded-lg shadow-lg hover:bg-gray-300 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500'
                onClick={() => document.getElementById('modal_invite_love').close()}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default ModalInviteLove
