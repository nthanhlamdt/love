import { IoClose } from 'react-icons/io5'

function ImageAlbums({ photo, selectedAlbum, setSelectedAlbum, albums, setAlbums }) {
  const handleEditCaption = (photoId, newCaption) => {
    const updatedPhotos = selectedAlbum.photos.map(photo =>
      photo.id === photoId ? { ...photo, caption: newCaption } : photo
    )
    const updatedAlbum = { ...selectedAlbum, photos: updatedPhotos }
    setAlbums(albums.map(album => (album.id === selectedAlbum.id ? updatedAlbum : album)))
    setSelectedAlbum(updatedAlbum)
  }

  const handleDeletePhoto = (photoId) => {
    const updatedPhotos = selectedAlbum.photos.filter(photo => photo.id !== photoId)
    const updatedAlbum = { ...selectedAlbum, photos: updatedPhotos }
    setAlbums(albums.map(album => (album.id === selectedAlbum.id ? updatedAlbum : album)))
    setSelectedAlbum(updatedAlbum)
  }

  return (
    <div className='bg-pink-100 p-4 rounded-lg shadow-md relative overflow-hidden'>
      <img src={photo.url} alt={photo.caption} className='w-full h-48 object-cover rounded-t-lg'/>
      <input
        type='text'
        value={photo.caption}
        onChange={(e) => handleEditCaption(photo.id, e.target.value)}
        className='bottom-0 w-full p-2 bg-pink-200 border-t border-pink-300 rounded-b-lg outline-none'
        placeholder='Chỉnh sửa mô tả'
      />
      <button
        onClick={() => handleDeletePhoto(photo.id)}
        className='absolute top-2 right-2 text-white font-semibold py-2 px-2 rounded-full hover:bg-pink-300'
      >
        <IoClose />
      </button>
    </div>
  )
}

export default ImageAlbums