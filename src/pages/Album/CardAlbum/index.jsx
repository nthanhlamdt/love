import { BsThreeDotsVertical } from 'react-icons/bs'

function CardAlbum({ album, handleDeleteAlbum, setSelectedAlbum }) {
  const handleAlbumClick = (album) => {
    setSelectedAlbum(album)
  }

  return (
    <div
      className="bg-pink-100 p-6 rounded-lg shadow-lg border border-pink-300 cursor-pointer relative"
      onClick={() => handleAlbumClick(album)}
    >
      <img src={album.photos[0]?.url || 'https://purepng.com/public/uploads/large/purepng.com-photos-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596102asedt.png'} alt={album.title} className="w-full h-48 object-cover rounded-lg mb-4"/>
      <h3 className="text-xl font-bold mb-2 text-pink-600">{album.title}</h3>
      <p className="text-pink-700">{album.description}</p>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteAlbum(album.id)
        }}
        className="absolute top-1 right-1 bg-transparent text-white font-semibold py-1 px-1 rounded-full hover:bg-pink-200"
      >
        <BsThreeDotsVertical />
      </button>
    </div>
  )
}

export default CardAlbum