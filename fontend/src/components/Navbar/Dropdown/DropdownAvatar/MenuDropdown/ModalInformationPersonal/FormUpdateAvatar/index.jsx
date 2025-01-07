import { useState, useRef } from 'react'
import { User, Upload, X } from 'lucide-react'
import { updateAvatarUser } from '~/api/api'
import { useAuthContext } from '~/context/authContext'
import { toast } from 'react-toastify'
import Loading from '~/components/Loading'

export default function AvatarUpdateForm({ avatar, setIsOpenUpdateAvatar }) {
  const { authUser, setAuthUser } = useAuthContext()
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0] // Lấy ảnh đầu tiên
    if (file) {
      const newImage = URL.createObjectURL(file)
      setImage([newImage])
      setFile(file)
    }
  }

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
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result)
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateAvatar = async () => {
    if (!file) {
      toast.error('Vui lòng chọn ảnh đại diện mới!')
    }
    setIsLoading(true)
    await updateAvatarUser({ file })
      .then(data => {
        setAuthUser({ ...data, status: authUser.status })
        localStorage.setItem('user', JSON.stringify(data))
        toast.success('Cập nhật thông tin cá nhân thành công!')
        setIsOpenUpdateAvatar(false)
      })
      .catch(() => {
        toast.error('Đã có lỗi xảy ra vui lòng thử lại!')
      })
      .finally(() => {
        setIsLoading(false)
        setFile(false)
        setImage(false)
      })
  }

  return (
    <div className='fixed inset-0 flex z-20 items-center justify-center bg-[rgba(0,0,0,0.3)]'>
      {isLoading && <Loading />}
      <div className='relative w-full max-w-md mx-auto bg-white rounded-lg shadow-md'>
        <div className='p-6'>
          <h2 className='text-2xl font-bold text-center'>Cập nhật ảnh đại diện</h2>
        </div>
        <button
          className='absolute right-2 top-2'
          onClick={() => setIsOpenUpdateAvatar(false)}
        >
          <X />
        </button>
        <div className='p-6'>
          <div className='space-y-4'>
            <div className='flex justify-center space-x-4'>
              <div className='relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300'>
                {image ? (
                  <img src={image} alt='New Avatar' className='w-full h-full object-cover' />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                    <User className='w-16 h-16 text-gray-400' />
                  </div>
                )}
              </div>
              <div className='w-8 flex items-center justify-center'>
                <Upload className='w-6 h-6 text-gray-400' />
              </div>
              <div className='relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300'>
                <img src={avatar} alt='Current Avatar' className='w-full h-full object-cover' />
              </div>
            </div>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-pink-500 hover:border-pink-700'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <p className='text-sm text-gray-600'>Drag and drop your image here or click to select</p>
            </div>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className='p-6'>
          <button
            className='w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors'
            onClick={handleUpdateAvatar}
          >
            Cập nhật ảnh đại diện
          </button>
        </div>
      </div>
    </div>
  )
}