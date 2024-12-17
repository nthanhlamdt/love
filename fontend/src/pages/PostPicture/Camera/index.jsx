import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Webcam from 'react-webcam'
import { IoMdCamera } from 'react-icons/io'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaCameraRetro } from 'react-icons/fa' // Icon để chuyển camera
import { uploadPost } from '~/api/api'

function Camera({ pictures, setPictures }) {
  const webcamRef = useRef(null)
  const [url, setUrl] = useState(null)
  const parentRef = useRef(null)
  const [facingMode, setFacingMode] = useState('environment') // Bắt đầu với camera sau
  const userLove = JSON.parse(localStorage.getItem('userLove'))
  const user = JSON.parse(localStorage.getItem('user'))

  const base64ToBlob = (base64) => {
    const byteString = atob(base64.split(',')[1])
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: mimeString })
  }

  const [data, setData] = useState({
    id: pictures.length + 1,
    src: '',
    user: 'Ngô Thành Lâm',
    title: ''
  })

  const videoConstraints = {
    width: { ideal: 400 },
    height: { ideal: 600 },
    facingMode: facingMode // Sử dụng biến facingMode
  }

  const capturePhoto = () => {
    if (!url) {
      const imageSrc = webcamRef.current.getScreenshot()
      setUrl(imageSrc)
      setData({ ...data, src: base64ToBlob(imageSrc) })
    }
    else {
      setUrl(null)
      setData({
        id: pictures.length + 1,
        src: '',
        user: 'Ngô Thành Lâm',
        title: ''
      })

      uploadPost({
        file: data.src,
        userLove: userLove._id,
        status: data.title
      })
        .then((data) => {
          setPictures([{ ...data, userPostId: { avatar: user.avatar, fullName: user.fullName, _id: user._id } }, ...pictures])
          toast.success('Đăng ảnh thành công')
        })
    }
  }

  const onUserMediaError = () => {
    toast.error('Không truy cập được máy ảnh')
  }

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment')) // Chuyển đổi giữa camera trước và sau
  }

  return (
    <div className='h-full flex items-center justify-center'>
      <div ref={parentRef} className='flex max-w-[500px] w-[95%] justify-center items-center h-[90%] relative'>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat='image/png'
          onUserMediaError={onUserMediaError}
          videoConstraints={videoConstraints}
          className='h-full w-[95%] object-cover rounded-3xl border-4 border-pink-500'
        />

        <button
          className='flex justify-center items-center absolute top-8 right-8 bg-white w-12 h-12 rounded-full border-4 border-pink-400 hover:border-pink-300'
          onClick={toggleCamera} // Nút để chuyển camera
        >
          <FaCameraRetro className='text-xl text-pink-400 hover:text-pink-300' />
        </button>

        <button
          className='flex justify-center items-center absolute bottom-8 bg-white w-16 h-16 rounded-full border-4 border-pink-400 hover:border-pink-300'
          onClick={capturePhoto}
        >
          <IoMdCamera className='text-2xl text-pink-400 hover:text-pink-300' />
        </button>

        {url && (
          <div className='flex justify-center absolute top-0 left-0 w-full h-full overflow-hidden'>
            <img
              src={url}
              alt='Captured'
              className='object-cover w-[95%] border-4 border-pink-500 rounded-3xl'
            />
            <input
              className='absolute bottom-32  bg-white outline-none py-2 px-4 rounded-full text-pink-500'
              placeholder='Thêm đoạn tin nhắn'
              value={data.title}
              onChange={e => setData({ ...data, title: e.target.value })}
            />

            <button
              className='flex justify-center items-center absolute bottom-8 bg-white w-16 h-16 rounded-full border-4 border-green-500 hover:border-green-400'
              onClick={capturePhoto}
            >
              <FiArrowUpRight className='text-8xl text-green-500 hover:text-green-400' />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Camera