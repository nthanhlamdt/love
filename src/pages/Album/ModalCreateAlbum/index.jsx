import { useState, useRef, useEffect } from 'react'
import FileUpload from '../../../components/FileUpload/index'

function ModalCreateAlbum({ albums, setAlbums }) {
  const [newAlbum, setNewAlbum] = useState({ title: '', description: '' })
  const [images, setImages] = useState([])
  const imageDropdownRef = useRef(null)

  const handleAddAlbum = () => {
    if (newAlbum.title && newAlbum.description) {
      const newAlbumObj = {
        id: albums.length + 1,
        title: newAlbum.title,
        description: newAlbum.description,
        photos: []
      }
      setAlbums([...albums, newAlbumObj])
      setNewAlbum({ title: '', description: '' })
    }
  }

  const handleClickOutside = (event) => {
    if (imageDropdownRef.current && !imageDropdownRef.current.contains(event.target)) {
      setImages([])
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    // <button className="btn" >open modal</button>
    <dialog ref={imageDropdownRef} id="modal_create_album" className="modal">
      <div className="modal-box bg-pink-100 p-6 rounded-lg shadow-lg border border-pink-300 mt-8">
        <h2 className="text-3xl font-semibold mb-6 text-pink-800">Tạo Album Mới</h2>
        <input
          type="text"
          placeholder="Tiêu đề album"
          value={newAlbum.title}
          onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
          className="w-full p-2 mb-4 border border-pink-300 rounded outline-none"
        />
        <textarea
          placeholder="Mô tả album"
          value={newAlbum.description}
          onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
          className="w-full p-2 mb-4 border border-pink-300 rounded outline-none"
        />

        <FileUpload
          images = {images}
          setImages = {setImages}
        />

        <button
          onClick={handleAddAlbum}
          className="bg-pink-500 text-white font-semibold my-3 py-2 px-4 rounded-full hover:bg-pink-600 w-full"
        >
          Tạo Album
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default ModalCreateAlbum