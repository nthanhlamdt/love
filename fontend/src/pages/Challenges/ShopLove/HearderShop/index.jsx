import { Box, RectangleEllipsis, ShoppingCart } from 'lucide-react'

export default function HearderShop({ shoppingCart }) {
  return (
    <div className="py-5 text-pink-500 font-semibold text-md">
      <div className='flex items-center justify-between'>
        <span className='border-4 border-pink-600 rounded-xl py-2 px-4'><span className='font-bold text-2xl '>5000 </span>điểm</span>

        <div className='flex'>
          <div className='flex py-2 px-4 bg-pink-100 rounded-lg items-center cursor-pointer relative'>
            <ShoppingCart className='mr-1' />
            <span className='hidden md:block'>giỏ hàng</span>
            {shoppingCart.length != 0 && <span className='absolute -top-2 -right-1 bg-pink-800 px-2 text-white text-sm rounded-full'>{shoppingCart.length}</span>}
          </div>

          <div className='flex py-2 px-4 bg-pink-100 rounded-lg items-center mx-2 cursor-pointer relative'>
            <Box className='mr-1' />
            <span className='hidden md:block'>Đã mua</span>
            <span className='absolute -top-2 -right-1 bg-pink-800 px-2 text-white text-sm rounded-full'>2</span>
          </div>

          <div className='flex py-2 px-4 bg-pink-100 rounded-lg items-center cursor-pointer relative'>
            <RectangleEllipsis className='mr-1' />
            <span className='hidden md:block'>Yêu cầu</span>
            <span className='absolute -top-2 -right-1 bg-pink-800 px-2 text-white text-sm rounded-full'>2</span>
          </div>
        </div>
      </div>
    </div>
  )
}
