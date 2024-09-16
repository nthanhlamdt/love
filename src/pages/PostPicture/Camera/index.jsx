import { useCallback, useRef, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Webcam from 'react-webcam'
import { IoMdCamera } from 'react-icons/io'
import { FiArrowUpRight } from 'react-icons/fi'

function Camera() {
  const webcamRef = useRef(null)
  const [url, setUrl] = useState(null)
  const parentRef = useRef(null)
  const [videoConstraints, setVideoConstraints] = useState({
    width: { ideal: 400 },
    height: { ideal: 600 },
    facingMode: 'environment'
  })

  useEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        const parentWidth = parentRef.current.offsetWidth
        const parentHeight = parentRef.current.offsetHeight
        setVideoConstraints({
          width: { ideal: parentWidth },
          height: { ideal: parentHeight },
          facingMode: 'environment'
        })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      <div ref={parentRef} className='flex w-full max-w-md justify-center items-center h-[90%] relative'>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat='image/png'
          onUserMedia={onUserMedia}
          onUserMediaError={onUserMediaError}
          videoConstraints={videoConstraints}
          mirrored={true}
          className='h-full w-[95%]  object-cover rounded-3xl border-4 border-pink-500'
        />

        {/* Nút chụp ảnh */}
        <button
          className='flex justify-center items-center absolute bottom-8 bg-white w-16 h-16 rounded-full border-4 border-pink-400 hover:border-pink-300'
          onClick={capturePhoto}
        >
          <IoMdCamera className='text-2xl text-pink-400 hover:text-pink-300' />
        </button>

        {url && (
          <div className=' flex justify-center absolute top-0 left-0 w-full h-full overflow-hidden'>
            <img
              src={url}
              alt='Captured'
              className='object-cover w-[95%] border-4 border-pink-500 rounded-3xl'
            />

            <input
              className='absolute bottom-32 bg-[rgba(249,168,212,0.5)] bg-pink-300 outline-none py-2 px-4 rounded-full text-white'
              placeholder='Thêm đoạn tin nhắn'
            />
            <button
              className='flex justify-center items-center absolute bottom-8 bg-white w-16 h-16 rounded-full border-4 border-green-400 hover:border-green-300'
              onClick={capturePhoto}
            >
              <FiArrowUpRight className='text-8xl text-green-400 hover:text-green-300'/>
            </button>
          </div>
        )}
      </div>
    </div>

  )
}

export default Camera
