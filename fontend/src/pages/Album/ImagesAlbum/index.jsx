import { useState, useEffect } from 'react'
import CardImage from './CardImage'
import HeaderImage from './HeaderImage'
import { useNavigate, useParams } from 'react-router-dom'
import CardAddImage from './CardAddImage'
import { useAlbumContext } from '../../../context/albumContext'
import EmptyAlbumImage from './EmptyAlbumImage'
import NavAddImages from './NavAddImages'

export default function ImagesAlbum() {
  const { id } = useParams()
  const { albums } = useAlbumContext()
  const navigate = useNavigate()

  const [fileImages, setFileImages] = useState([])
  const [selectedAddImages, setSelectedAddImages] = useState([])

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
      <HeaderImage
        album={album}
        setFileImages={setFileImages}
      />

      <div className='mt-5'>
        {album.images.length > 0 || fileImages.length > 0 ? (
          <div>
            {selectedAddImages.length != 0 &&
              <NavAddImages
                selectedAddImages={selectedAddImages}
                setSelectedAddImages={setSelectedAddImages}
                fileImages={fileImages}
                albumId={id}
                setFileImages={setFileImages}
              />
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {fileImages.map((image, index) => (
                <CardAddImage
                  key={image.file.name}
                  index={index}
                  image={image}
                  setFileImages={setFileImages}
                  albumId={id}
                  setSelectedAddImages={setSelectedAddImages}
                  selectedAddImages={selectedAddImages}
                />
              ))}
            </div>

            {fileImages.length > 0 && <hr className='border-2 my-5'/>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {album.images.map((image, index) => (
                <CardImage key={image._id} image={image} album={album} index={index} />
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
