import { Store } from 'lucide-react'
import HearderShop from './HearderShop'
import NavbarGiftBox from './NavbarGiftBox'
import CardsGifBox from './CardsGifBox'
import { useState } from 'react'

export default function ShopLove() {
  const [selectedTypeGiftBox, setSelectedTypeGiftBox] = useState('all')
  const [shoppingCart, setShoppingCart] = useState([''])

  return (
    <div className='mt-10'>
      <div className='flex items-center'>
        <Store size={40} className='font-semibold text-yellow-400'/>
        <h2 className='text-4xl font-semibold text-pink-500 ml-2'>Cửa hàng tình yêu</h2>
      </div>

      <div>
        <HearderShop shoppingCart={shoppingCart} />
        <NavbarGiftBox selectedTypeGiftBox={selectedTypeGiftBox} setSelectedTypeGiftBox={setSelectedTypeGiftBox} />
        <CardsGifBox selectedTypeGiftBox={selectedTypeGiftBox} setSelectedTypeGiftBox={setSelectedTypeGiftBox} setShoppingCart={setShoppingCart} />
      </div>
    </div>
  )
}
