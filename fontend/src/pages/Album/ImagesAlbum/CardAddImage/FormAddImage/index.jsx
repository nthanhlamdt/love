import { Calendar, MapPin, Captions } from 'lucide-react'
import { addImageToAlbum } from '../../../../../api/api'
import { toast } from 'react-toastify'
import { useAlbumContext } from '../../../../../context/albumContext'

export default function FormAddImage({ data, setData, formattedDate, albumId, setFileImages, index }) {
  const { setAlbums } = useAlbumContext()

  const handleSaveImage = () => {
    if (!data.name || !data.location || !data.time) {
      return toast.error('Vui lòng nhập đủ thông tin!')
    }

    const imageData = [{
      name: data.name,
      time: data.time,
      location: data.location,
      albumId
    }]

    const files = data.file ? [data.file] : []

    addImageToAlbum({
      data: imageData,
      files: files
    })
      .then((dt) => {
        setFileImages(prev => {
          const newFileImages = prev.filter(image => image.file !== data.file) // Lọc phần tử cần xóa
          return newFileImages
        })

        setAlbums(prev =>
          prev.map(album => {
            if (album._id === albumId) {
              // Khi tìm thấy album, thêm ảnh mới vào `images`
              return {
                ...album,
                images: [dt.arrayImageCreate[index], ...album.images]
              }
            }
            return album // Không thay đổi album khác
          })
        )

        toast.success('Thêm ảnh vào album thành công!')
      })
      .catch(() => {
        toast.error('Đã có lỗi sảy ra vui lòng thử lại!')
      })
  }

  return (
    <div className='absolute bottom-0 p-3 bg-[rgba(255,255,255,0.5)] w-full text-pink-400 text-xs'>
      <div className='flex items-center'>
        <Captions size={16} />
        <input
          type="text"
          value={data.name || ''} // Đảm bảo không có lỗi khi chưa có giá trị
          onChange={e => setData({ ...data, name: e.target.value })}
          placeholder='Tiêu đề ảnh'
          className='ml-1 bg-[rgba(255,255,255,0.2)] font-semibold placeholder-pink-500 outline-pink-500 px-2 py-1 text-xs text-pink-600 border-pink-500 border-2 rounded-md w-full'
        />
      </div>

      <div className='flex justify-between'>
        <p className='flex items-center my-1 w-[60%]'>
          <Calendar size={16} />
          <input
            type="date"
            value={data.time || formattedDate} // Đảm bảo giá trị không rỗng
            onChange={e => setData({ ...data, time: e.target.value })}
            className='ml-1 bg-[rgba(255,255,255,0.2)] outline-pink-500 placeholder-pink-500 font-semibold px-2 py-1 text-xs text-pink-600 border-pink-500 border-2 rounded-md w-full'
          />
        </p>

        <p className='flex items-center w-[40%]'>
          <MapPin size={16} />
          <input
            type="text"
            value={data.location || ''} // Đảm bảo không có lỗi khi chưa có giá trị
            onChange={e => setData({ ...data, location: e.target.value })}
            placeholder='Địa điểm'
            className='ml-1 bg-[rgba(255,255,255,0.2)] placeholder-pink-500 outline-pink-500 font-semibold px-2 py-1 text-xs text-pink-600 border-pink-500 border-2 rounded-md w-full'
          />
        </p>
      </div>

      <button
        onClick={handleSaveImage}
        className='w-full bg-pink-600 py-1 rounded-lg mt-1 text-white font-bold cursor-pointer hover:bg-pink-700'>
        Lưu ảnh
      </button>
    </div>
  )
}
