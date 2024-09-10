import { useState, useEffect } from 'react'
import HeaderCalendar from './HeaderCalendar'
import ListDayCalendar from './ListDayCalendar'


function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const date = new Date()
    setCurrentDate(date)
  }, [])

  return (
    <div className="mx-auto mt-4 p-4 border border-pink-300 rounded-lg shadow-lg bg-white">
      <HeaderCalendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      <ListDayCalendar currentDate={currentDate}/>
    </div>
  )
}

export default Calendar
