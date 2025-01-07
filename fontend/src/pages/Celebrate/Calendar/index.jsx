import MonthCalendar from './MonthCalendar'
import ImagesCalendar from './ImagesCalendar'

export default function Calendar({ setSelectedCalendar }) {
  return (
    <div>
      <div
        className="px-2 py-2 bg-center bg-cover bg-[url('/assets/background_calendar.png')] shadow-2xl shadow-pink-800 mt-1 border-[16px] border-pink-600 flex flex-col items-center lg:flex-row"
      >
        <ImagesCalendar />
        <main className='ml-5 flex-1'>
          <h1 className='lg:text-[70px] my-5 font-lovelight text-[50px] text-center font-bold text-pink-500'>Chúc mừng kỷ niệm</h1>
          <MonthCalendar setSelectedCalendar={setSelectedCalendar} />
        </main>
      </div>
    </div>
  )
}
