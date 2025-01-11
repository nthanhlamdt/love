import { useEffect } from 'react'
import CardImage from './CardImage'
import HeaderImage from './HeaderImage'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlbumContext } from '../../../context/albumContext'
import EmptyAlbumImage from './EmptyAlbumImage'

export default function ImagesAlbum() {
  const { id } = useParams()
  const { albums } = useAlbumContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (albums.length === 0) {
      navigate('/album')
    }
  }, [albums, navigate])

  const album = albums.find((album) => album._id === id)

  if (!album) {
    return <EmptyAlbumImage />
  }

  return (
    <div className='min-w-screen container mx-auto my-10'>
      <HeaderImage album={album}/>

      <div className='mt-5'>
        {album.images.length > 0? (
          <div>
            <div className="grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
              {album.images.map((image, index) => (
                <CardImage
                  key={image._id}
                  image={image}
                  album={album}
                  index={index}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyAlbumImage />
        )}
      </div>
    </div>
  )
}
