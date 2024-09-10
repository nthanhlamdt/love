import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../../../../context/authContext'


function ModalInviteLove() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const { authUser } = useAuthContext()

  const submitRequestSetLove = async () => {
    if (!phoneNumber || !message) {
      setMessage('')
      setPhoneNumber('')
      return toast.error('Vui lòng nhập đầy đủ thông tin')
    }
    // await fetchSetLoveAPI({ idRequest: authUser.id, phoneNumber, status: 'Request', message: message })
    //   .then(() => {
    //     setPhoneNumber('')
    //     setMessage('')
    //   })
    //   .then(() => toast.success('Gửi yêu cầu thành công'))
  }
  return (
    <dialog id="modal_invite_love" className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-pink-100 rounded-lg shadow-2xl max-w-lg w-full h-auto max-h-[90vh] overflow-auto">
        {/* Background Decoration */}
        <div className="absolute inset-0 flex justify-center items-center">
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#f6a6b6" // Màu hồng đậm hơn
              d="M100 165l-50-50a35 35 0 0 1 0-50 35 35 0 0 1 50 0 35 35 0 0 1 50 0 35 35 0 0 1 0 50l-50 50z"
            />
          </svg>
        </div>

        {/* Modal Content */}
        <div className="relative z-10 p-8">
          <h3 className="font-bold text-4xl text-pink-800 mb-6 text-center animate-fade-in">
            Gửi yêu cầu kết nối
          </h3>

          <form method="dialog" className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Số Điện Thoại"
              className="input input-bordered w-full"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />

            <textarea
              className="textarea textarea-bordered"
              placeholder="Lời nhắn bạn muốn gửi"
              value={message}
              onChange={e => setMessage(e.target.value)}
            ></textarea>

            {/* Buttons */}
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={submitRequestSetLove}
                type="submit"
                className="bg-pink-700 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-pink-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                Gửi yêu cầu
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg shadow-lg hover:bg-gray-300 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
