import { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { useNavigate } from 'react-router-dom'
import CardAlbum from './CardAlbum'
import ModalCreateAlbum from './ModalCreateAlbum'
import HeaderAlbum from './HeaderAlbum'
import { dataTest } from '../../../Data/DATATEST.js'

// const dataAlbums = [
//   {
//     id: 1,
//     title: 'Chuyến Đi Đà Nẵng',
//     description: 'Album lưu giữ những kỷ niệm đáng nhớ tại Đà Nẵng.',
//     photos: [
//       {
//         id: 1,
//         url: 'https://wall.vn/wp-content/uploads/2020/04/cau-rong-da-nang.jpg',
//         caption: 'Bãi biển Mỹ Khê'
//       },
//       {
//         id: 2,
//         url: 'https://tse1.mm.bing.net/th?id=OIP.4jkr166tnHgMY8lfjBVSEQHaE8&pid=Api&P=0&h=180',
//         caption: 'Cầu Rồng'
//       },
//       {
//         id: 3,
//         url: 'https://tse4.mm.bing.net/th?id=OIP.NOMdYPhklK0BSV5IphLqwQHaD-&pid=Api&P=0&h=180',
//         caption: 'Bảo tàng Chăm'
//       }
//     ]
//   }
// ]

const MemoryAlbum = () => {
  const Navigate = useNavigate()
  const [albums, setAlbums] = useState(dataTest.dataAlbums)

  const [selectedAlbum, setSelectedAlbum] = useState(null)

  const handleDeleteAlbum = (albumId) => {
    const updatedAlbums = albums.filter(album => album.id !== albumId)
    setAlbums(updatedAlbums)
    setSelectedAlbum(null)
  }

  return (
    <div className='mx-auto px-8 rounded-lg'>
      <HeaderAlbum />

      {/* Danh Sách Album Ảnh */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
        {albums.map(album => (
          <CardAlbum
            key={album.id}
            album={album}
            handleDeleteAlbum={handleDeleteAlbum}
            setSelectedAlbum={setSelectedAlbum}
          />
        ))}
      </div>

      {/* Modal Hiển Thị Các Ảnh Trong Album */}
      {selectedAlbum && (
        Navigate(`/albums/presently_album/${selectedAlbum.id}`)
      )}

      {/* Thêm Album Mới */}
      <ModalCreateAlbum
        albums={albums}
        setAlbums={setAlbums}
        dateAlbums={dataTest.dataAlbums}
      />
    </div>

  )
}

export default MemoryAlbum
