import MonthCalendar from './MonthCalendar'
import ImagesCalendar from './ImagesCalendar'
import { Heart } from 'lucide-react'
import ModalCreateCalendar from './ModalCreateCalendar'
import { useState } from 'react'

export default function Calendar({ setSelectedCalendar }) {
  const [statusModal, setStatusModal] = useState(null)

  return (
    <div>
      {/* <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-pink-500 font-handwriting">
        <Heart className="inline-block text-pink-500 ml-2" size={32} />
        Lịch Kỷ Niệm Tình Yêu
        <Heart className="inline-block text-pink-500 ml-2" size={32} />
      </h1> */}
      <div
        className="px-2 py-2 bg-center bg-cover bg-[url('/assets/background_calendar.png')] shadow-2xl shadow-pink-800 mt-1 border-[16px] border-pink-600 flex flex-col items-center lg:flex-row"
      >
        <ImagesCalendar />
        <main className='ml-5 flex-1'>
          <h1 className='lg:text-[70px] my-5 font-lovelight text-[50px] text-center font-bold text-pink-500'>Chúc mừng kỷ niệm</h1>
          <MonthCalendar setSelectedCalendar={setSelectedCalendar} setStatusModal={setStatusModal} />
        </main>
      </div>

      {statusModal && <ModalCreateCalendar statusModal={statusModal} setStatusModal={setStatusModal} />}
    </div>
  )
}
