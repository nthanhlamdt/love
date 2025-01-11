import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { updateAlbums } from '../../../../../../api/api'
import { useAlbumContext } from '../../../../../../context/albumContext'
import Input from '~/components/Input'
import Label from '~/components/Label'

export default function ModalUpdateAlbum({ album }) {
  const { setAlbums } = useAlbumContext()
  const modalRef = useRef(null)
  const [dataUpdate, setDataUpdate] = useState({
    name: album.name,
    description: album.description
  })

  const handleUpdateAlbum = () => {
    if (!dataUpdate.name || !dataUpdate.description) {
      return toast.error('Vui lòng nhập đầy đủ thông tin cập nhật!')
    }
    updateAlbums({
      albumId: album._id,
      name: dataUpdate.name,
      description: dataUpdate.description
    })
      .then(( data ) => {
        toast.success('Cập nhật thành công!')
        setAlbums(prevAlbums => prevAlbums.map(a => {
          return a._id === data._id ? { ...a, ...data } : a
        }))
        modalRef.current.close()
      })
      .catch(() => {
        toast.error('Cập nhật thất bại!')
      })
  }

  return (
    <div>
      <dialog id="modal_update_album" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setDataUpdate({
                name: album.name,
                description: album.description
              })}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl text-pink-600">Cập nhật album</h3>

          <div className="flex flex-col my-5">
            <div>
              <Label title={'Tên album *'} />
              <Input
                title={'Tên album'}
                type="text"
                value={dataUpdate.name}
                onChange={e => setDataUpdate({ ...dataUpdate, name: e.target.value })}
              />
            </div>
            <div className='mt-2'>
              <Label title={'Mô tả *'} />
              <Input
                type="text"
                title={'Mô tả'}
                value={dataUpdate.description}
                className="text-pink-500 p-2 border-4 border-pink-400 outline-pink-500 rounded-lg mr-5"
                onChange={e => setDataUpdate({ ...dataUpdate, description: e.target.value })}
              />
            </div>
          </div>

          <div className='float-end flex items-center'>
            <button
              className='px-4 py-1 bg-pink-600 rounded-md text-white hover:bg-pink-700'
              onClick={handleUpdateAlbum}
            >
              Cập nhật
            </button>
            <form method="dialog">
              <button
                className='px-4 hover:text-[rgba(0,0,0,0.6)]'
                onClick={() => setDataUpdate({
                  name: album.name,
                  description: album.description
                })}
              >
                Quay lại
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
