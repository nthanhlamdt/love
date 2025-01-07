import { Crown, Trophy } from 'lucide-react'
export default function Leaderboard() {
  const user = JSON.parse(localStorage.getItem('user'))
  const userLove = JSON.parse(localStorage.getItem('userLove'))
  return (
    <div className='flex-1 mr-0 lg:mr-5 xl:mr-10'>
      <div className='flex justify-start items-center'>
        <Crown size={40} className='font-semibold text-yellow-400'/>
        <h2 className='text-4xl font-semibold text-pink-500 ml-2'>Bảng xếp hạng</h2>
      </div>

      <p className='text-xl mt-4 text-pink-400'>xem ai đang dẫn đầu về điểm nào</p>

      <div className='flex justify-around items-center  mt-8'>
        <div className='relative flex flex-col items-center p-4 bg-pink-100 rounded-lg'>
          <img
            src={user?.avatar}
            alt='Tên người'
            className='w-32 h-32 rounded-full border-2 border-pink-500 object-cover object-center'
          />

          <h3 className='text-pink-600 font-semibold my-3'>{user?.fullName}</h3>
          <span className='text-blue-600 font-bold text-xl'>300 điểm</span>
          <span className='absolute right-1 top-1 text-yellow-500'><Trophy size={50}/></span>
        </div>

        <div className='relative flex flex-col items-center p-4 bg-pink-100 rounded-lg'>
          <img
            src={userLove?.avatar}
            alt='Tên người'
            className='w-32 h-32 rounded-full border-2 border-pink-500 object-cover object-center'
          />

          <h3 className='text-pink-600 font-semibold my-3'>{ userLove?.fullName }</h3>
          <span className='text-blue-600 font-bold text-xl'>250 điểm</span>
          <span className='absolute right-1 top-1 text-[#C0C0C0]'><Trophy size={50}/></span>
        </div>
      </div>
    </div>
  )
}
