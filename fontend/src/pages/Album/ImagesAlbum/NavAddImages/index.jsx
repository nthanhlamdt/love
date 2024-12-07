import { motion } from 'framer-motion'
import { SaveAll, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import ModalInfolack from './ModalInfolack'
import { addImageToAlbum } from '../../../../api/api'
import { toast } from 'react-toastify'
import { useAlbumContext } from '../../../../context/albumContext'
import { useParams } from 'react-router-dom'

export default function NavAddImages({ selectedAddImages, setSelectedAddImages, fileImages, albumId, setFileImages }) {
  const { setAlbums } = useAlbumContext()
  const { id } = useParams()
  const [check, setCheck] = useState(false)
  const [defaultData, setDefaultData] = useState({
    name: '',
    location: ''
  })

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedAddImages(Array.from({ length: fileImages.length }, (_, index) => index))
    } else {
      setSelectedAddImages([])
    }
  }

  const handleSaveImages = () => {
    const newArrayImages = selectedAddImages.map(select => fileImages[select])

    // Kiểm tra xem có ảnh nào thiếu tên hoặc vị trí không
    const hasInvalidData = newArrayImages.some(data => !data.name || !data.location)

    if (hasInvalidData) {
      setCheck(true)
      return
    }

    const data = newArrayImages.map((dt) => ({
      name: dt.name || defaultData.name,
      location: dt.location || defaultData.location,
      time: dt.time,
      albumId
    }))

    const files = newArrayImages.map(dt => dt.file)

    addImageToAlbum({ data, files })
      .then((dt) => {
        setFileImages(prev => prev.filter((_, index) => !selectedAddImages.includes(index)))
        setSelectedAddImages([])

        setAlbums(prev =>
          prev.map(album => {
            if (album._id === id) {
              // Khi tìm thấy album, thêm ảnh mới vào `images`
              return {
                ...album,
                images: [...dt.arrayImageCreate, ...album.images]
              }
            }
            return album // Không thay đổi album khác
          })
        )
        toast.success('Thêm ảnh thành công!')
      })
      .catch(() => {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!')
      })
  }

  return (
    <motion.div
      className='flex items-center justify-between rounded-lg bg-pink-100 mb-4 text-pink-600 font-semibold py-2 px-5'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className='flex items-center'>
        <div className='flex flex-col items-center mr-3'>
          <input
            type='checkbox'
            checked={selectedAddImages.length === fileImages.length}
            onChange={handleCheckboxChange}
          />
          <span>tất cả</span>
        </div>
        <p>Đã chọn <span className='font-bold'>{selectedAddImages.length}</span></p>
      </div>
      <div className='flex items-center justify-between'>
        <SaveAll
          size={20}
          className='cursor-pointer'
          onClick={handleSaveImages}
        />

        <Trash2
          size={20}
          className='mx-5 cursor-pointer'
        />

        <X
          size={20}
          className='cursor-pointer'
          onClick={() => setSelectedAddImages([])}
        />
      </div>
      {check &&
        <ModalInfolack
          setCheck={setCheck}
          defaultData={defaultData}
          setDefaultData={setDefaultData}
          fileImages={fileImages}
          selectedAddImages={selectedAddImages}
          setFileImages={setFileImages}
          setSelectedAddImages={setSelectedAddImages}
        />}
    </motion.div>
  )
}
