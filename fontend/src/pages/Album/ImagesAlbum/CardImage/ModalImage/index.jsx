import { X } from 'lucide-react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

export default function ModalImage({ imageCover, setImageCover, album }) {
  const isVideo = (image) => {
    const videoExtensions = ['mp4', 'avi', 'mov', 'webm', 'mkv']
    const src = image.src || (image.file && image.file.name)
    const ext = src ? src.split('.').pop().toLowerCase() : ''
    return videoExtensions.includes(ext)
  }

  return (
    <div>
      <div className='absolute flex justify-center items-center z-[9999] inset-0 bg-[rgba(0,0,0,0.8)]'>
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

          {
            isVideo(album.images[imageCover]) ? (
              <video
                key={album.images[imageCover].src}
                className='max-h-[90%] object-cover object-center rounded-lg'
                controls
                autoPlay
                loop
              >
                <source src={album.images[imageCover].src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={album.images[imageCover].src}
                alt={album.images[imageCover].name}
                loading="lazy"
                className='max-h-[90%] object-cover object-center rounded-lg' />
            )
          }

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
