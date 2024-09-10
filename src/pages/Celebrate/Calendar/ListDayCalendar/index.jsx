import ModalCreateCelebrate from './ModalCreateCelebrate'
import { Heart, Sparkles, Coffee, Gift, Music, Camera, MessageCircle, Space } from 'lucide-react'

const dataCalendar = [{
  title: 'Ngay hen ho',
  description: 'di bien',
  anniversaryDay: new Date(2024, 8, 3),
  emotion: <Heart/>
}]
function ListDayCalendar({ currentDate }) {
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

  const daysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i)
    }

    return days
  }

  // kiểm tra ngày có phải ngày hiện tại
  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()
  }

  const isTodayMemory = (day) => {
    return dataCalendar.find(memory => {
      //memory.anniversaryDay.getDate() === day && memory.anniversaryDay.getMonth === currentDate.getMonth() && currentDate.getFullYear() === memory.anniversaryDay.getFullYear()
      return memory.anniversaryDay.getDate() === day && memory.anniversaryDay.getMonth() === currentDate.getMonth() && currentDate.getFullYear() === memory.anniversaryDay.getFullYear()
    }) || ''
  }

  return (
    <div className="grid grid-cols-7 gap-1 text-center font-semibold text-pink-600">
      {daysOfWeek.map(day => (
        <div
          key={day}
          className="p-2 border-b border-pink-200"
        >
          {day}
        </div>
      ))}
      {daysInMonth().map((day, index) => (
        <div
          key={index}
          onClick={() => document.getElementById(`modal_create_celebrate+${index}`).showModal()}
          className={`cursor-pointer px-2 py-4 text-xl ${day ? 'hover:bg-pink-100' : 'text-gray-400'} ${day && isToday(day) ? 'bg-pink-200 font-bold' : ''}`}
        >
          <ModalCreateCelebrate
            id={`modal_create_celebrate+${index}`}
            data={isTodayMemory(day)}
            date={`${day < 10? '0'+ day: day }/${currentDate.getMonth() + 1 < 10? '0' + Number(currentDate.getMonth() + 1): currentDate.getMonth() + 1}/${currentDate.getFullYear()}`}
          />
          {isTodayMemory(day)? (
            <div className='flex items-center justify-center'>
              <span className='mr-1'>{isTodayMemory(day).emotion}</span>
              <span>{day}</span>
            </div>
          ): day || ''}
        </div>
      ))}
    </div>
  )
}

export default ListDayCalendar