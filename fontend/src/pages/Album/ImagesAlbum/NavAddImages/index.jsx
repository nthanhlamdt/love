import { motion } from 'framer-motion'
import { SaveAll, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import ModalInfolack from './ModalInfolack'
import { addImageToAlbum, sendNotification } from '../../../../api/api'
import { toast } from 'react-toastify'
import { useAlbumContext } from '../../../../context/albumContext'
import { useParams } from 'react-router-dom'

export default function NavAddImages({
  selectedAddImages,
  setSelectedAddImages,
  fileImages,
  album,
  albumId,
  setFileImages,
  setLoadingStates
}) {
  const { setAlbums } = useAlbumContext()
  const { id } = useParams()
  const [check, setCheck] = useState(false)
  const [defaultData, setDefaultData] = useState({
    name: '',
    location: ''
  })
  const userlove = JSON.parse(localStorage.getItem('userLove'))

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedAddImages(Array.from({ length: fileImages.length }, (_, index) => index))
    } else {
      setSelectedAddImages([])
    }
  }

  const handleSaveImages = () => {
    const newArrayImages = selectedAddImages.map(select => fileImages[select])
    const hasInvalidData = newArrayImages.some(data => !data.name || !data.location)

    if (hasInvalidData) {
      setCheck(true)
      return
    }

    saveImages(newArrayImages)
  }

  const saveImages = async (newArrayImages) => {
    if (newArrayImages.length == 0) {
      return toast.error('Vui lòng lựa chọn ảnh cần thêm')
    }

    const data = newArrayImages.map((dt) => ({
      name: dt.name || defaultData.name,
      location: dt.location || defaultData.location,
      time: dt.time,
      albumId
    }))

    const files = newArrayImages.map(dt => dt.file)
    selectedAddImages.map(select => {
      setLoadingStates(prev => {
        const updatedState = [...prev]
        updatedState[select] = true
        return updatedState
      })
    })

    var count = 0
    await Promise.all(
      data.map(async (item, index) => {
        await addImageToAlbum({ data: item, file: files[index] })
          .then(dt => {
            count++
            setFileImages(prev => prev.filter((_, i) => !selectedAddImages.includes(i)))
            setLoadingStates(prev => {
              const updatedState = [...prev]
              updatedState.splice(selectedAddImages[index], 1)
              return updatedState
            })
            setAlbums(prev =>
              prev.map(album => {
                if (album._id === id) {
                  return {
                    ...album,
                    images: [dt, ...album.images]
                  }
                }
                return album
              })
            )
            setSelectedAddImages([])
            setLoadingStates([])
          })
          .catch(() => {
            toast.error(`Đã có lỗi xảy ra với ảnh ${selectedAddImages[index]}.`)
          })
      })
    )

    if (count != 0) {
      // Gửi thông báo
      await sendNotification({
        type: 'add_image_album',
        title: `đã thêm ${count} ảnh vào album ${album.name}`,
        phoneNumber: userlove.phoneNumber,
        albumId: albumId
      })

      toast.success(`Thêm ${count} ảnh thành công!`)
    }
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
          onClick={() => {
            setSelectedAddImages([])
            setFileImages([])
          }}
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
          album={album}
          userlove={userlove}
          setLoadingStates={setLoadingStates}
          saveImages={saveImages}
        />}
    </motion.div>
  )
}
