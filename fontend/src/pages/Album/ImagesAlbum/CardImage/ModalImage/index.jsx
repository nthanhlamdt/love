import { X } from 'lucide-react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

export default function ModalImage({ imageCover, setImageCover, album }) {
  return (
    <div >
      <div className='absolute flex justify-center items-center z-[999] inset-0 bg-[rgba(0,0,0,0.5)]'>
        <X
          size={40}
          className=' fixed top-14 right-14 text-white cursor-pointer'
          onClick={() => setImageCover(null)}
        />

        <div className='flex justify-between items-center h-full w-[90%] select-none'>
          <BiLeftArrow
            size={40}
            className='text-white cursor-pointer w-10'
            onClick={() => imageCover > 0 ? setImageCover(imageCover - 1) : setImageCover(album.images.length - 1)}
          />

          <img src={album.images[imageCover].src} className='max-h-[80%] max-w-[70%] object-cover object-center' />

          <BiRightArrow
            size={40}
            className='text-white cursor-pointer w-10'
            onClick={() => imageCover < album.images.length - 1 ? setImageCover(imageCover + 1) : setImageCover(0)}
          />
        </div>
      </div>
    </div>
  )
}
