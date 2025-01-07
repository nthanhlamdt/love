import { useState } from 'react'
import { toast } from 'react-toastify'
import Input from '~/components/Input'
import Label from '~/components/Label'
import { X } from 'lucide-react'
import Button from '~/components/Button'
import { updateImageAlbum } from '~/api/api'
import { useAlbumContext } from '~/context/albumContext'
import { useParams } from 'react-router-dom'
import Loading from '~/components/Loading'

export default function ModalUpdateImage({ setIsModalUpdate, image }) {
  const { setAlbums, albums } = useAlbumContext()
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const [dataUpdate, setDataUpdate] = useState({
    name: image.name,
    location: image.location,
    time: image.time
  })

  const handleUpdateImageAlbum = async() => {
    if (!dataUpdate.name || !dataUpdate.location || !dataUpdate.time) {
      return toast.error('Vui lòng nhập đầy đủ thông tin cập nhật!')
    }
    setIsLoading(true)
    await updateImageAlbum({
      imageId: image._id,
      name: dataUpdate.name,
      location: dataUpdate.location,
      time: dataUpdate.time
    })
      .then(data => {
        const albumIndex = albums.findIndex((album) => album._id === id)
        if (albumIndex !== -1) {
          // Tạo bản sao của album để tránh thay đổi trực tiếp state
          const updatedAlbum = { ...albums[albumIndex] }

          updatedAlbum.images = updatedAlbum.images.map((img) => {
            return img._id === image._id ? data : img
          })

          // Cập nhật lại state albums
          setAlbums((prev) => {
            const updatedAlbums = [...prev]
            updatedAlbums[albumIndex] = updatedAlbum // Thay thế album cũ bằng album đã cập nhật
            return updatedAlbums
          })
        }
        toast.success('Đã cập nhật thông tin ảnh thành công!')
      })
      .catch(() => {
        toast.error('Có lỗi hệ thống vui lòng thử lại')
      })
      .finally(() => {
        setIsModalUpdate(false)
        setIsLoading(false)
      })
  }

  return (
    <div className='fixed flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.3)] z-10'>
      {isLoading && <Loading />}
      <div className='relative bg-white rounded-lg p-6 max-w-md w-full overflow-auto max-h-[90%]'>
        <button
          className='absolute top-2 right-2 text-pink-500'
          onClick={() => setIsModalUpdate(false)}
        >
          <X />
        </button>
        <form method='dialog'>
          <h3 className='font-bold text-xl text-pink-600'>Cập nhật album</h3>
          <div className='flex flex-col my-5'>
            <div>
              <Label title={'Tiêu đề *'}/>
              <Input
                type={'text'}
                title={'Tiêu đề'}
                value={dataUpdate.name}
                onChange={e => setDataUpdate({ ...dataUpdate, name: e.target.value })}
              />
            </div>

            <div>
              <Label title={'Địa điểm *'}/>
              <Input
                type={'text'}
                title={'Địa điểm'}
                value={dataUpdate.location}
                onChange={e => setDataUpdate({ ...dataUpdate, location: e.target.value })}
              />
            </div>

            <div>
              <Label title={'Thời gian *'}/>
              <Input
                type={'date'}
                title={'Thời gian'}
                value={dataUpdate.time}
                onChange={e => setDataUpdate({ ...dataUpdate, time: e.target.value })}
              />
            </div>
          </div>

          <div className='float-end flex items-center'>
            <Button
              colorText={'text-white'}
              colorBg={'bg-pink-600'}
              title={'Cập nhật'}
              className={'hover:bg-pink-700'}
              onClick={handleUpdateImageAlbum}
            />
            <Button
              colorText={'text-pink-600'}
              colorBg={'bg-white'}
              title={'Quay lại'}
              className={'hover:text-[rgba(0,0,0,0.6)]'}
              onClick={() => setIsModalUpdate(false)}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
