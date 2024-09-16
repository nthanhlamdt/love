import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Webcam from 'react-webcam'
import { IoMdCamera } from 'react-icons/io'
import { FiArrowUpRight } from 'react-icons/fi'

const videoConstraints = {
  width: { ideal: 400 },
  height: { ideal: 600 },
  facingMode: 'environment'
}

function Camera() {
  const webcamRef = useRef(null)
  const [url, setUrl] = useState(null)

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setUrl(imageSrc)
  }, [webcamRef])

  const onUserMedia = () => {
    toast.success('Camera loaded successfully')
  }

  const onUserMediaError = (e) => {
    toast.error(`Error accessing camera: ${e.message}`)
  }

  return (
    <div className='h-full flex items-center justify-center'>
      {/* Khung chứa camera và ảnh */}
      <div className='flex justify-center items-center h-5/6 relative'>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat='image/png'
          onUserMedia={onUserMedia}
          onUserMediaError={onUserMediaError}
          videoConstraints={videoConstraints}
          mirrored={true}
          className='w-full h-full rounded-3xl'
        />
        {/* Nút chụp ảnh */}
        <button
          className='flex justify-center items-center absolute bottom-8 bg-white w-16 h-16 rounded-full border-4 border-pink-400 hover:border-pink-300'
          onClick={capturePhoto}
        >
          <IoMdCamera className='text-2xl text-pink-400 hover:text-pink-300' />
        </button>

        {url && (
          <div className='flex justify-center absolute bottom-0'>
            <img
              src={url}
              alt='Captured'
              className='w-full h-full object-cover rounded-3xl'
            />

            <button
              className='flex justify-center items-center absolute bottom-8 bg-white w-16 h-16 rounded-full border-4 border-green-400 hover:border-green-300 '
              onClick={capturePhoto}
            >
              <FiArrowUpRight className=' text-8xl text-green-400 hover:text-green-300'/>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Camera
