import TopCard from './TopCard'
import BottomCard from './BottomCard'
import { useState } from 'react'

export default function CardAlbum({ album }) {
  const [fileUpload, setFileUpload] = useState(null)
  const [imageCover, setImageCover] = useState()

  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer transform hover:-rotate-1'>
      <TopCard
        album={album}
        fileUpload={fileUpload}
        imageCover={imageCover}
        setImageCover={setImageCover}
        setFileUpload={setFileUpload}
      />
      <BottomCard
        album={album}
        setImageCover={setImageCover}
        setFileUpload={setFileUpload}
      />
    </div>
  )
}
