import { EllipsisVertical, ArrowLeft, Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { patchAlbums } from '../../../../api/api'
import toast from 'react-hot-toast'
import Menu from './Menu'

export default function TopCard({ album, fileUpload, imageCover, setImageCover, setFileUpload }) {
  const [loading, setLoading] = useState(false)
  const menuRef = useRef(null)
  // const [isChecked, setIsChecked] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const buttonMenuRef = useRef(null)
  const fileInputRef = useRef(null)
  const [showArrowLeft, setShowArrowLeft] = useState(true) // Trạng thái để hiển thị ArrowLeft

  const handleUpdateImageCover = () => {
    
    if (fileUpload) {
      console.log(fileUpload)
      setLoading(true)
      patchAlbums({ file: fileUpload, albumId: album._id })
        .then(() => {
          toast.success('Cập nhật thành công!')
          setLoading(false)
          setFileUpload(null)
        })
        .catch((error) => {
          toast.error(error)
          setLoading(false)
        })
    } else {
      toast.error('Vui lòng chọn một tệp hình ảnh!')
    }
  }

  const handleClickOutside = (event) => {
    if ((menuRef.current && !menuRef.current.contains(event.target)) && (buttonMenuRef.current && !buttonMenuRef.current.contains(event.target))) {
      setMenuVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // const handleCheckboxChange = () => {
  //   const newCheckedState = !isChecked
  //   setIsChecked(newCheckedState)

  //   if (newCheckedState) {
  //     setSelectedAlbums((prevSelected) => [...prevSelected, album._id])
  //   } else {
  //     setSelectedAlbums((prevSelected) => prevSelected.filter(id => id !== album._id))
  //   }
  // }

  const handleFileImageChange = (e) => {
    const file = e.target.files[0] // Lấy ảnh đầu tiên
    if (file) {
      const newImage = URL.createObjectURL(file)
      setImageCover([newImage])
      setFileUpload(file)
      setMenuVisible(false)
      setShowArrowLeft(true)
    }
  }

  return (
    <div className='relative'>
      {loading && (
        <span className="text-white absolute inset-0 flex items-center justify-center loading loading-spinner loading-lg"></span>
      )}
      <img
        src={imageCover ? imageCover : album.coverImage}
        alt={album.name}
        className='hero w-full h-64 object-cover object-center'
        loading="lazy"
      />

      {fileUpload ? (
        <div>
          { showArrowLeft && <ArrowLeft
            className='absolute top-5 left-5 bg-black text-white rounded-md hover:bg-[rgba(0,0,0,0.2)]'
            onClick={() => {
              setFileUpload(null)
              setImageCover(null)
            }}
          /> }
          <Check
            className='absolute bottom-5 right-5 bg-green-400 text-white rounded-md'
            onClick={() => {
              handleUpdateImageCover()
              setShowArrowLeft(false)
            }}
          />
        </div>
      ) : (
        <div>
          <div className={`absolute inset-0 ${menuVisible ? 'opacity-100' : 'opacity-0'} hover:opacity-100 transition-opacity duration-300 text-white`}>
            <EllipsisVertical
              ref={buttonMenuRef}
              className='float-end mr-2 mt-2 cursor-pointer bg-[rgba(0,0,0,0.5)] rounded-full w-8 h-8'
              onClick={(e) => {
                e.stopPropagation() // Ngăn chặn sự kiện click lan ra ngoài
                setMenuVisible((prev) => !prev)
              }}
            />
          </div>
        </div>
      )}

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileImageChange}
        accept="image/*"
      />

      {menuVisible && (
        <Menu
          fileInputRef={fileInputRef}
          album={album}
          menuRef={menuRef}
        />
      )}
    </div>
  )
}
