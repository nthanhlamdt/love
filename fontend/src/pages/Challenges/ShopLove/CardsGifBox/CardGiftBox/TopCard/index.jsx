import { ShoppingCart } from 'lucide-react'

export default function TopCard({ giftbox }) {

  return (
    <div className='relative group'>
      <img
        src={giftbox.image}
        alt={giftbox.name}
        className='hero w-full h-64 object-cover object-center'
        loading="lazy"
      />
      <div className='absolute inset-0 top-0 left-0 bg-[rgba(0,0,0,0.4)] hidden group-hover:flex justify-center items-center text-xl'>
        <span className='flex items-center px-4 py-2 bg-pink-100 hover:bg-pink-200 text-black rounded-xl'><ShoppingCart className='mr-2'/>Thêm vào giỏ</span>
      </div>
    </div>
  )
}
