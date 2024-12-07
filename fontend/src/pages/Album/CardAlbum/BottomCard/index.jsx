import { ImageIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BottomCard({ album }) {

  const navigate = useNavigate()
  const countImage = album.images.length

  return (
    <div className='p-6 relative'>
      <div className='relative group'>
        <h2 className='text-2xl font-semibold text-pink-600 mb-2 overflow-hidden text-ellipsis whitespace-nowrap'>{album.name}</h2>
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 bg-[rgba(0,0,0,0.4)] text-white text-center text-xs rounded py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {album.name}
        </span>
      </div>

      <div className='relative group'>
        <p className='text-pink-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>
          {album.description}
        </p>
        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mb-1 bg-[rgba(0,0,0,0.4)] text-white text-center text-xs rounded py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {album.description}
        </span>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <button
          className='text-sm text-pink-500 font-medium hover:text-pink-700 transition-colors'
          onClick={() => navigate(`/album/${album._id}`)}
        >
          Khám phá ngay
        </button>
        <div
          className='text-pink-500 hover:text-pink-700 transition-colors flex items-center'
          onClick={() => navigate(`/album/${album._id}`)}
        >
          <ImageIcon size={20} />
          <span className='mx-1'>{countImage}</span>
        </div>
      </div>
    </div>
  )
}
