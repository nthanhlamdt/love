import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import UploadFile from './UploadFile'

export default function HeaderImage({ album }) {
  return (
    <div>
      <Link className='inline-flex text-pink-400' to='/album'>
        <ChevronLeft />
        <span>Quay lại Album</span>
      </Link>

      <div className='flex justify-between items-center mt-5'>
        <div>
          <h2 className='text-3xl font-bold text-pink-700'>{album.name}</h2>
          <p className='text-pink-500 mt-4'>{album.description}</p>
        </div>
        <UploadFile album={album} />
      </div>
    </div>
  )
}
