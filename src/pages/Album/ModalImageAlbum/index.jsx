import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ImageAlbums from './ImageAlbums'

function ModalImageAlbum({ selectedAlbum, setSelectedAlbum, albums, setAlbums }) {
  const [newPhoto, setNewPhoto] = useState({ url: '', caption: '' })
  const [photoFile, setPhotoFile] = useState(null)

  const handleCloseModal = () => {
    setSelectedAlbum(null)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPhotoFile(url)
      setNewPhoto({ ...newPhoto, url })
    }
  }

  const handleAddPhoto = () => {
    if (newPhoto.url && newPhoto.caption) {
      const updatedAlbum = {
        ...selectedAlbum,
        photos: [...selectedAlbum.photos, { ...newPhoto, id: selectedAlbum.photos.length + 1 }]
      }
      setAlbums(albums.map(album => (album.id === selectedAlbum.id ? updatedAlbum : album)))
      setSelectedAlbum(updatedAlbum)
      setNewPhoto({ url: '', caption: '' })
      setPhotoFile(null)
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center'>
          <h2 className='text-3xl font-semibold mb-4 text-pink-800'>Album: {selectedAlbum.title}</h2>
          <div className='dropdown dropdown-end rounded-full hover:bg-pink-100 p-2'>
            <div tabIndex={0} role="button" className="m-1">
              <BsThreeDotsVertical className='text-xl text-pink-300'/>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-pink-400">
              <li onClick={handleCloseModal}><a>Xóa</a></li>
              <li><a>Tạo</a></li>
            </ul>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
          {selectedAlbum.photos.map(photo => (
            <ImageAlbums
              key={photo._id}
              photo={photo}
              selectedAlbum={selectedAlbum}
              setSelectedAlbum={setSelectedAlbum}
              albums={albums}
              setAlbums={setAlbums}
            />
          ))}
        </div>
        <div className='bg-pink-100 p-6 rounded-lg shadow-lg border border-pink-300'>
          <h3 className='text-xl font-semibold mb-4 text-pink-800'>Thêm Ảnh Mới</h3>
          <label htmlFor='photo-upload' className='mb-5 inline-block bg-pink-500 text-white font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-pink-600 transition duration-300'>
            Chọn Ảnh
            <input
              type='file'
              id='photo-upload'
              accept='image/*'
              onChange={handleFileUpload}
              className='hidden'
            />
          </label>
          {photoFile && (
            <div className='mb-4'>
              <img src={photoFile} alt='Preview' className='w-48 h-48 object-cover object-center rounded-lg'/>
            </div>
          )}
          <textarea
            placeholder='Mô tả ảnh'
            value={newPhoto.caption}
            onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
            className='w-full p-2 mb-4 border border-pink-300 rounded outline-none'
          />
          <button
            onClick={handleAddPhoto}
            className='bg-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-pink-600'
          >
            Thêm Ảnh Vào Album
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalImageAlbum