import CardAlbum from './CardAlbum'
import HeaderAlbum from './HeaderAlbum'
import { useState } from 'react'
import { useAlbumContext } from '../../context/albumContext.jsx'
import CreateCardAlbum from './CreateCardAlbum'
import NavSelectedCard from './NavSelectedCard'

export default function Album() {
  const { albums } = useAlbumContext()
  const [selectedAlbums, setSelectedAlbums] = useState([])

  return (
    <div className='relative w-screen pb-5'>
      <HeaderAlbum />

      {selectedAlbums.length > 0 && (
        <NavSelectedCard selectedAlbums={selectedAlbums} />
      )}
      <main className='container mx-auto mt-5'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <CreateCardAlbum />
          {albums.map((album) => (
            <CardAlbum
              key={album._id}
              album={album}
              selectedAlbums={selectedAlbums}
              setSelectedAlbums={setSelectedAlbums}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
