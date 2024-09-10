import { GrAdd } from 'react-icons/gr'

function HeaderAlbum() {
  return (
    <div className='mt-3 flex justify-between items-center mb-8'>
      <h1 className='text-pink-500 font-bold text-xl'>Danh sách Album ảnh</h1>
      <button
        className="flex items-center p-2 rounded-full bg-pink-500 hover:bg-pink-400 text-white"
        onClick={() => document.getElementById('modal_create_album').showModal()}
      >
        <GrAdd className='text-2xl font-bold'/>
        <span className='md:block hidden pl-1'>Tạo Album</span>
      </button>
    </div>
  )
}

export default HeaderAlbum