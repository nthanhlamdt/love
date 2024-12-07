import { Crown, Trophy } from 'lucide-react'
export default function Leaderboard() {
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
            src='assets/imgtest.jpg'
            alt='Tên người'
            className='w-32 h-32 rounded-full border-2 border-pink-500'
          />

          <h3 className='text-pink-600 font-semibold my-3'>Ngô Thành Lâm</h3>
          <span className='text-blue-600 font-bold text-xl'>300 điểm</span>
          <span className='absolute right-1 top-1 text-yellow-500'><Trophy size={50}/></span>
        </div>

        <div className='relative flex flex-col items-center p-4 bg-pink-100 rounded-lg'>
          <img
            src='https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-1/273019099_110471211545544_9219954687133581124_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF_jkCNko6F1pN2l5rb_l90UUfWl6IxHkFRR9aXojEeQSeCtj90Zrs6dEuRXXFlHkQf_k2r0sKgGm96SGbIz8LR&_nc_ohc=fZHMpthQW1wQ7kNvgEd5OdP&_nc_zt=24&_nc_ht=scontent.fdad2-1.fna&_nc_gid=Ayx6pXYNnMizVSju31fMkPo&oh=00_AYAuDg-rRFKoTXYpe_Z7EInwuC8ZVIxz97dVHzmZNNHwCA&oe=6726954F'
            alt='Tên người'
            className='w-32 h-32 rounded-full border-2 border-pink-500'
          />

          <h3 className='text-pink-600 font-semibold my-3'>Võ Thị Na Vi</h3>
          <span className='text-blue-600 font-bold text-xl'>250 điểm</span>
          <span className='absolute right-1 top-1 text-[#C0C0C0]'><Trophy size={50}/></span>
        </div>
      </div>
    </div>
  )
}
