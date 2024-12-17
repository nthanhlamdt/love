// import { Badge, EyeOff, Gift, Heart, List } from 'lucide-react'
import BottomCard from './BottomCard'
import TopCard from './TopCard'

export default function CardGiftBox({ giftbox }) {
  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer transform hover:-rotate-1'>
      <TopCard giftbox={giftbox} />
      <BottomCard giftbox={giftbox} />
    </div>
  )
}
