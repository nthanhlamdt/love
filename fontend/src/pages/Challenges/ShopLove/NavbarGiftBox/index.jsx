import { Camera, CircleUser, Coffee, Flower, Gift, Ticket } from 'lucide-react'

export default function NavbarGiftBox({ selectedTypeGiftBox, setSelectedTypeGiftBox }) {
  return (
    <div>
      <ul className='bg-pink-100 rounded-md flex text-pink-600 font-semibold text-sm'>
        <li
          className={`py-2 text-[10px] md:text-sm w-full cursor-pointer p-1 flex flex-col items-center justify-center ${selectedTypeGiftBox == 'all' && 'bg-white'}`}
          onClick={() => setSelectedTypeGiftBox('all')}
        >
          <Gift />
          <span >Tất cả</span>
        </li>

        <li className={`py-2 text-[10px] md:text-sm w-full cursor-pointer p-1 flex flex-col items-center justify-center ${selectedTypeGiftBox == 'present' && 'bg-white'}`}
          onClick={() => setSelectedTypeGiftBox('present')}
        >
          <Flower />
          <span>Quà tặng</span>
        </li>

        <li className={`py-2 text-[10px] md:text-sm w-full cursor-pointer p-1 flex flex-col items-center justify-center ${selectedTypeGiftBox == 'experience' && 'bg-white'}`}
          onClick={() => setSelectedTypeGiftBox('experience')}
        >
          <Coffee />
          <span>Trải nghiệm</span>
        </li>

        <li className={`py-2 text-[10px] md:text-sm w-full cursor-pointer p-1 flex flex-col items-center justify-center ${selectedTypeGiftBox == 'service' && 'bg-white'}`}
          onClick={() => setSelectedTypeGiftBox('service')}
        >
          <Camera />
          <span>Dịch vụ</span>
        </li>

        <li className={`py-2 text-[10px] md:text-sm w-full cursor-pointer p-1 flex flex-col items-center justify-center ${selectedTypeGiftBox == 'voucher' && 'bg-white'}`}
          onClick={() => setSelectedTypeGiftBox('voucher')}
        >
          <Ticket />
          <span>Voucher</span>
        </li>

        <li className={`py-2 text-[10px] md:text-sm w-full cursor-pointer p-1 flex flex-col items-center justify-center ${selectedTypeGiftBox == 'hidden gift' && 'bg-white'}`}
          onClick={() => setSelectedTypeGiftBox('hidden gift')}
        >
          <CircleUser />
          <span>Quà ẩn</span>
        </li>
      </ul>
    </div>
  )
}
