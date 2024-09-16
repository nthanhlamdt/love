import { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { useNavigate } from 'react-router-dom'
import CardAlbum from './CardAlbum'
import ModalCreateAlbum from './ModalCreateAlbum'
import HeaderAlbum from './HeaderAlbum'
import ImagesAlbum from './ImagesAlbum'

const dataAlbums = [
  {
    id: 1,
    title: 'Chuyến Đi Đà Nẵng',
    description: 'Album lưu giữ những kỷ niệm đáng nhớ tại Đà Nẵng.',
    photos: [
      {
        id: 1,
        url: 'https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/428612755_411073891393500_5432439734118428374_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH2kWMeA4lLErOZdtScM6QlmtpI9eJbTh2a2kj14ltOHQqAQoPtzk0hq8EFeob4aIxLqL4Q5nTv0OD6FvGd5uoH&_nc_ohc=U5XxT3Mq_AEQ7kNvgE2lIuz&_nc_ht=scontent.fdad1-3.fna&oh=00_AYAAx0HAzpgeYMe-FTR63n_MUta1mdNczPYVM6YXI4wFaA&oe=66CCDA74',
        caption: 'Bãi biển Mỹ Khê'
      },
      {
        id: 2,
        url: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/428604483_1637629533435663_4113908433328337219_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH3ec7EtzPl46ErSD0r-re2hp7d0zf9zTyGnt3TN_3NPLe4B8G6nGWZegUZl5k5jaYtShIZAiJRjk0RvJaab-Xd&_nc_ohc=l3TOoN5GmM8Q7kNvgHu-OkO&_nc_ht=scontent.fdad3-4.fna&oh=00_AYB4hPROc0Ig9Eenv204U0tVMtHdWItwyUX5WgvMYOKEVg&oe=66B12356',
        caption: 'Cầu Rồng'
      },
      {
        id: 3,
        url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/449847305_1719991785199437_1181917033287494810_n.jpg?stp=dst-jpg_s600x600&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGFjx74bMZ0cxLHy1XFdXur5cYu6IJ4VTDlxi7ognhVMKtVg8aIVis_9OxphlP6Oo8aMjqgXBrk5pco_gCYYb2T&_nc_ohc=XsNY45yehzUQ7kNvgE9aZjp&_nc_ht=scontent.fdad3-5.fna&gid=A4viUYe9XZv_h-eUuUGU8mj&oh=00_AYDKYszZgGMa8UoBtmURp55NwMbQObZwwp8hWAIR7ZZwmQ&oe=66B11C59',
        caption: 'Bảo tàng Chăm'
      }
    ]
  }
]

const MemoryAlbum = () => {
  const Navigate = useNavigate()
  const [albums, setAlbums] = useState(dataAlbums)

  const [selectedAlbum, setSelectedAlbum] = useState(null)

  const handleDeleteAlbum = (albumId) => {
    const updatedAlbums = albums.filter(album => album.id !== albumId)
    setAlbums(updatedAlbums)
    setSelectedAlbum(null)
  }

  return (
    <div className='mx-auto px-8 rounded-lg container'>
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
        Navigate('/albums/imagesAlbum')
      )}

      {/* Thêm Album Mới */}
      <ModalCreateAlbum
        albums={albums}
        setAlbums={setAlbums}
      />
    </div>

  )
}

export default MemoryAlbum
