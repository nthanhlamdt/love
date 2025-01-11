import { EllipsisVertical } from 'lucide-react'
import DropDownMenu from './DropDownMenu'
import { useEffect, useRef, useState } from 'react'

export default function InforImage({ image, setImageCover, index }) {
  const isVideo = () => {
    const videoExtensions = ['mp4', 'avi', 'mov', 'webm', 'mkv']
    // Kiểm tra phần mở rộng từ image.src hoặc image.file.name nếu image.file tồn tại
    const src = image.src || (image.file && image.file.name)
    const ext = src ? src.split('.').pop().toLowerCase() : ''
    return videoExtensions.includes(ext)
  }

  const [visibleMenu, setVisibleMenu] = useState(false)
  const menuRef = useRef(null)
  const buttonMenuRef = useRef(null)

  const handleClickOutside = (event) => {
    if ((menuRef.current && !menuRef.current.contains(event.target)) && (buttonMenuRef.current && !buttonMenuRef.current.contains(event.target))) {
      setVisibleMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOpenImage = () => {
    setImageCover(index)
  }

  return (
    <div>
      {visibleMenu && (
        <DropDownMenu
          image={image}
          menuRef={menuRef}
          handleOpenImage={handleOpenImage}
        />
      )}
      <div className='relative'>
        <div
          className='flex items-center justify-center z-20 absolute right-2 top-2 lg:right-5 lg:top-5 mb-1 rounded-full w-5 h-5 md:w-7 md:h-7 float-end bg-[rgba(0,0,0,0.5)] text-white p-1'
          ref={buttonMenuRef}
          onClick={() => {
            setVisibleMenu(!visibleMenu)
          }}
        >
          <EllipsisVertical className='w-5 h-5 lg:w-5' />
        </div>

        {
          isVideo(image.src) ?
            (<video className='hero w-full h-36 md:h-48 lg:h-64 object-cover object-center'>
              <source src={image.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>) :
            <img
              src={image.src}
              alt={image.name}
              loading="lazy"
              className='hero w-full h-36 md:h-48 lg:h-64 object-cover object-center' />
        }

        <div
          className='z-10 absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300'
          onClick={handleOpenImage}
        >
          <span className='text-white text-sm lg:text-lg font-semibold'>
            Xem ảnh
          </span>
        </div>
      </div>
    </div>
  )
}
