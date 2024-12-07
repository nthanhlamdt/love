import { deleteAlbums } from '../../../../../../api/api'
import { useAlbumContext } from '../../../../../../context/albumContext'
import toast from 'react-hot-toast'

export default function ModalDeleteAlbum({ setLoading, album }) {
  const { albums, setAlbums } = useAlbumContext()
  const handleDelete = () => {
    setLoading(true)
    deleteAlbums({ albumId: album._id })
      .then(() => {
        toast.success(`Đã xóa album ${album.name}!`)
        const newAlbums = albums.filter(al => {
          return al._id != album._id
        })
        setAlbums(newAlbums)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        toast.error('Xóa album thất bại!')
      })
  }

  return (
    <div>
      <dialog id="modal_delete_album" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-xl text-pink-600">Xóa album</h3>
          <p className="py-4 text-pink-600">Bạn có chắn chắn muốn xóa album <span className='font-semibold'>{album.name}</span></p>
          <div className='float-end flex items-center'>
            <button
              className='px-4 py-1 bg-pink-600 rounded-md text-white hover:bg-pink-700'
              onClick={handleDelete}
            >
              Xóa
            </button>
            <form method="dialog"><button className='px-4 hover:text-[rgba(0,0,0,0.6)]'>Quay lại</button></form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
