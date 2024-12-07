import { ChevronLeft, ChevronRight, Heart, Clock } from 'lucide-react'
import { useState } from 'react'
export default function MonthCalendar({ setSelectedCalendar, setStatusModal }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month - 1, 1).getDay()
    return day === 0 ? 7 : day
  }

  const generateCalendar = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year)
    const firstDay = getFirstDayOfMonth(month, year) - 1 //1
    const calendar = []

    for (let j = 0; j < 7; j++) {
      // 7 cột
      if (j < firstDay && j < 6) {
        calendar[j] = null
      }
    }
    let day = 1
    for (let i = firstDay; i < daysInMonth + firstDay; i++) {
      // 6 hàng
      calendar[i] = day
      day++
    }

    return calendar
  }

  const clickPrevious = () => {
    if (month > 1) {
      setMonth(month - 1)
    } else {
      setMonth(12)
      setYear(year - 1)
    }
  }

  const clickNext = () => {
    if (month < 12) {
      setMonth(month + 1)
    } else {
      setMonth(1)
      setYear(year + 1)
    }
  }

  const isDateNow = (day) => {
    const dateNow = new Date()

    return (
      dateNow.getDate().valueOf() === day &&
      dateNow.getMonth().valueOf() + 1 === month &&
      dateNow.getFullYear().valueOf() === year
    )
  }

  return (
    <div className="mt-2">
      <div className="flex justify-around items-center text-pink-500">
        <ChevronLeft onClick={clickPrevious} />
        <h2
          className="text-center font-semibold text-2xl cursor-pointer"
          onClick={() => {
            setMonth(new Date().getMonth() + 1)
            setYear(new Date().getFullYear())
          }}
        >
          Tháng {month} năm {year}
        </h2>
        <ChevronRight onClick={clickNext} />
      </div>

      <div className="w-full grid grid-cols-7 gap-2 mt-4">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
          <span key={day} className="text-center font-bold text-pink-500">
            {day}
          </span>
        ))}

        {generateCalendar(month, year).map((day, index) => (
          <div
            key={index}
            onClick={() => setStatusModal(`${day > 10? day: '0' + day}-${month > 10 ? month : '0' + month}-${year}`)}
            className={`relative text-center px-2 py-1 text-pink-500 ${
              day && 'hover:bg-pink-600 hover:text-white cursor-pointer'
            } ${isDateNow(day) && 'bg-pink-500 text-white'}`}
          >
            {false && (
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}
            <span className="relative z-10">{day}</span>
          </div>
        ))}
      </div>
      {/* <button
        className="w-full mt-5 justify-center px-5 py-3 bg-pink-600 text-white flex items-center text-lg md:text-2xl rounded-3xl hover:bg-pink-600"
        onClick={() => setSelectedCalendar(false)}
      >
        <Clock className="mr-2 size-10" />
        Cổ máy thời gian
      </button> */}
    </div>
  )
}
