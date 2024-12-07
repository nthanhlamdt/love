import { Swords } from 'lucide-react'
import Leaderboard from './Leaderboard'
import ChallengeType from './ChallengeType'
import ShopLove from './ShopLove'

export default function Challenges() {

  return (
    <div className='w-screen p-5'>
      <div className=' container mx-auto'>
        <div className='flex justify-center items-center text-4xl md:text-5xl font-bold text-center mb-8 text-pink-500 font-handwriting'>
          <Swords size={50} className='mr-3'/>
          <h1>Đường Đua Cặp Đôi</h1>
          <Swords size={50} className='ml-3'/>
        </div>

        <div className='lg:flex lg:justify-between items-start'>
          <Leaderboard />
          <ChallengeType />
        </div>

        <ShopLove />
        {/* <GiftBoxRandom /> */}
      </div>
    </div>
  )
}
