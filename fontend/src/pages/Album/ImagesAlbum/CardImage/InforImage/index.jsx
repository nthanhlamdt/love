import { MapPin, Calendar, EllipsisVertical } from 'lucide-react'
import DropDownMenu from './DropDownMenu'
import { useEffect, useRef, useState } from 'react'

export default function InforImage({ image, setImageCover, index, setIsModalUpdate }) {
  const timeDate = new Date(image.time)
  const timeString = (timeDate.getDate() >= 10 ? timeDate.getDate() : '0' + timeDate.getDate()) +
    '-' + (timeDate.getMonth() + 1 >= 10 ? timeDate.getMonth() + 1 : '0' + (timeDate.getMonth() + 1)) +
    '-' + timeDate.getFullYear()

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
      <div className='relative'>
        <div className='absolute z-[99] right-5 top-5 flex flex-col items-end'>
          <div
            className='mb-1 rounded-full w-6 h-6 float-end bg-[rgba(0,0,0,0.5)] text-white p-1'
            ref={buttonMenuRef}
            onClick={() => {
              setVisibleMenu(!visibleMenu)
            }}
          >
            <EllipsisVertical size={16} />
          </div>
          {visibleMenu && <DropDownMenu
            image={image}
            menuRef={menuRef}
            handleOpenImage={handleOpenImage}
            setIsModalUpdate={setIsModalUpdate}
          />}
        </div>

        {
          isVideo(image.src) ?
            (<video className='hero w-full h-64 object-cover object-center'>
              <source src={image.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>) :
            <img
              src={image.src}
              alt={image.name}
              loading="lazy"
              className='hero w-full h-64 object-cover object-center' />
        }

        <div
          className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300'
          onClick={handleOpenImage}
        >
          <span className='text-white text-lg font-semibold'>
            Xem ảnh
          </span>
        </div>

        <div className='absolute bottom-0 p-3 opacity-0 group-hover:opacity-100 bg-[rgba(0,0,0,0.3)] w-full'>
          <h2 className='text-xl mb-2 font-bold text-white'>{image.name}</h2>
          <div className="text-white font-semibold text-xs flex">
            <p className='flex items-center'>
              <Calendar size={16}/>
              <span className='ml-1'>{timeString}</span>
            </p>

            <p className='flex items-center ml-3'>
              <MapPin size={16}/>
              <span className='ml-1'>{image.location}</span>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
