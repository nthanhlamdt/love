import { X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { createAlbums } from '../../../../api/api'
import { useAlbumContext } from '../../../../context/albumContext'

export default function ModalCreateAlbum({ setIsModal }) {
  const { albums, setAlbums } = useAlbumContext()

  const [dataAlbum, setDataAlbum] = useState({
    name: '',
    description: '',
    coverImage: '/assets/send_letter.png',
    images: []
  })

  const onSubmitCreate = (e) => {
    e.preventDefault()

    if (!dataAlbum.name || !dataAlbum.description) {
      toast.error('Vui lòng nhập đầy đủ thông tin!')
      return // Thoát ra nếu không đủ thông tin
    }

    createAlbums({ name: dataAlbum.name, description: dataAlbum.description })
      .then((data) => {
        setAlbums([{ ...dataAlbum, _id: data._id }, ...albums])
        toast.success('Tạo album thành công!')
        setDataAlbum(data)
        setIsModal(false)
      })
      .catch(error => {
        toast.error(error?.response?.data?.message)
      })
  }

  return (
    <div className='flex justify-center items-center fixed z-30 w-screen h-screen top-0 right-0 bg-[rgba(0,0,0,0.3)]'>
      <div className='bg-[rgba(255,255,255,0.9)] p-5 relative rounded-2xl max-w-sm'>
        <span
          className='absolute top-3 right-3 text-pink-400'
          onClick={() => setIsModal(false)}
        ><X /></span>
        <form onSubmit={onSubmitCreate} className="flex flex-col justify-center">
          <h1 className="text-pink-500 font-bold text-center text-2xl">TẠO ALBUM</h1>
          <div className="flex justify-between">
            <div>
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text text-pink-500'>Tên album</span>
                </div>
                <input
                  type='text'
                  placeholder='Tên album'
                  value={dataAlbum.name}
                  onChange={e => setDataAlbum({ ...dataAlbum, name: e.target.value })}
                  className='input input-bordered w-full text-pink-500'
                />
              </label>

              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text text-pink-500'>Mô tả</span>
                </div>
                <textarea
                  className='textarea textarea-bordered text-pink-500'
                  placeholder='Mô tả về album của bạn'
                  value={dataAlbum.description}
                  onChange={e => setDataAlbum({ ...dataAlbum, description: e.target.value })}
                ></textarea>
              </label>
            </div>
            <div className="w-[30%] flex justify-center items-center">
              <img
                src="/assets/createAlbum.png"
                alt="Tạo album"
              />
            </div>
          </div>

          <button className="bg-pink-500 px-6 py-2 rounded-xl text-white font-bold mt-3">Tạo album</button>
        </form>
      </div>
    </div>
  )
}
