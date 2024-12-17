import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'

export default function UploadChallenge({ setPerformChallenges }) {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file) => {
    setImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className='fixed z-[999] inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)]'>
      <div className='w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='p-6'>
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            } transition-colors duration-300 ease-in-out`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className='relative'>
                <img src={preview} alt='Preview' className='mx-auto max-h-64 rounded-lg' />
              </div>
            ) : (
              <>
                <Upload className='mx-auto h-12 w-12 text-gray-400' />
                <p className='mt-2 text-sm text-gray-600'>Drag and drop your image here, or click to select</p>
              </>
            )}
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileInput}
              accept='image/*'
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            />
          </div>

          {
            image &&
            <div className='mt-4 flex justify-center'>
              <button
                onClick={() => setPerformChallenges(false)}
                className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg'
              >
                Lưu ảnh
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
