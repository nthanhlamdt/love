import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getMemory } from '../../../../api/api'
import { findDateInArray } from '~/utils/findDateInArray'
import { useNavigate } from 'react-router-dom'
import ModalCreateCalendar from './ModalCreateCalendar'

export default function MonthCalendar({ setSelectedCalendar }) {
  const navigate = useNavigate()
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [memoryMonth, setMemoryMonth] = useState([])
  const [statusModal, setStatusModal] = useState(null)

  useEffect(() => {
    getMemory({ month })
      .then(data => {
        setMemoryMonth(data)
        setStatusModal(false)
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Lỗi khi lấy memory:', error)
      })
  }, [month])

  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate()
  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month - 1, 1).getDay()
    return day === 0 ? 7 : day
  }

  const generateCalendar = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year)
    const firstDay = getFirstDayOfMonth(month, year) - 1
    const calendar = Array(7).fill(null)

    for (let i = firstDay; i < daysInMonth + firstDay; i++) {
      calendar[i] = i - firstDay + 1
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
      dateNow.getDate() === day &&
      dateNow.getMonth() + 1 === month &&
      dateNow.getFullYear() === year
    )
  }

  const handelClickMemory = (day, month, year) => {
    if (!day) return // Kiểm tra xem day có hợp lệ không (không phải null hoặc undefined)

    const selectedDate = new Date(year, month - 1, day)
    const foundMemory = findDateInArray(memoryMonth, selectedDate)

    if (foundMemory) {
      navigate(`/celebrate/${foundMemory._id}`)
    } else {
      setStatusModal(`${day > 9 ? day : '0' + day}-${month > 9 ? month : '0' + month}-${year}`)
    }
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
            onClick={() => handelClickMemory(day, month, year)}
            className={`relative text-center px-2 py-1 text-pink-500 ${
              day && 'hover:bg-pink-600 hover:text-white cursor-pointer'
            } ${isDateNow(day) && 'bg-pink-500 text-white'}`}
          >
            {day && findDateInArray(memoryMonth, new Date(year, month - 1, day)) && (
              <span className='absolute -top-2 -right-2'>
                {findDateInArray(memoryMonth, new Date(year, month - 1, day)).memoryType.icon}
              </span>
            )}
            <span className="relative">{day}</span>
          </div>
        ))}
      </div>

      <button
        className="w-full mt-5 justify-center px-5 py-3 bg-pink-600 text-white flex items-center text-lg md:text-2xl rounded-3xl hover:bg-pink-600"
        onClick={() => setSelectedCalendar(false)}
      >
        <Clock className="mr-2 size-10" />
        Cổ máy thời gian
      </button>
      {statusModal && <ModalCreateCalendar
        statusModal={statusModal}
        setStatusModal={setStatusModal}
        setMemoryMonth={setMemoryMonth}
      />}
    </div>
  )
}


