import { GrAdd } from 'react-icons/gr'
import ImagePresent from './ImagePresent'
import { useParams } from 'react-router-dom'
import { dataTest } from '../../../../Data/DATATEST.js'

function PresentlyAlbum() {
  const { id } = useParams()

  const image = dataTest?.dataAlbums?.find((dt) => {
    return dt.id === id
  })

  return (
    <div className='mx-8'>
      <div className='mt-3  flex justify-between items-center mb-8'>
        <h1 className='text-pink-500 font-bold text-xl'>Ảnh Đà Nẵng</h1>
        <button
          className="flex items-center p-2 rounded-full bg-pink-500 hover:bg-pink-400 text-white"
          onClick={() => document.getElementById('modal_create_album').showModal()}
        >
          <GrAdd className='text-2xl font-bold'/>
          <span className='md:block hidden pl-1'>Thêm ảnh</span>
        </button>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-8'>
        {
          image?.photos?.map((photo) => (
            <ImagePresent key={photo.id} photo={photo} />
          ))
        }
      </div>
    </div>
  )
}

export default PresentlyAlbum