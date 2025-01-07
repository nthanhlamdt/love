import { useState } from 'react'
import ModalImage from './ModalImage'
import InforImage from './InforImage'
import ModalUpdateImage from './InforImage/DropDownMenu/ModalUpdateImage'

export default function CardImage({ image, index, album }) {
  const [imageCover, setImageCover] = useState(null)
  const [isModalUpdate, setIsModalUpdate] = useState(false)

  return (
    <div>
      {imageCover != null &&
        <ModalImage
          imageCover={imageCover}
          setImageCover={setImageCover}
          album={album}
        />}

      <div
        className='bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer transform hover:-rotate-1 group'

      >
        <InforImage
          image={image}
          setImageCover={setImageCover}
          index={index}
          setIsModalUpdate={setIsModalUpdate}
        />
      </div>

      {isModalUpdate && <ModalUpdateImage
        setIsModalUpdate={setIsModalUpdate}
        image={image}
      />}
    </div>
  )
}
