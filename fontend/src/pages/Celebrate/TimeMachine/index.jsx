import { useEffect, useState } from 'react'
import TurnBackTime from './TurnBackTime'
import Memorable from './Memorable'

export default function TimeMachine({ selectedCalendar, setSelectedCalendar }) {
  const [statusLoading, setStatusLoading] = useState(false)
  const [statusTime, setStatusTime] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusLoading(true)
    }, 7000) // Bắt đầu hoạt động sau 7 giây

    return () => clearTimeout(timer)
  })

  return (
    <div className='w-full h-full '>
      {statusLoading &&
        <Memorable
          statusTime={statusTime}
          setStatusTime={setStatusTime}
        />}
      <TurnBackTime
        setSelectedCalendar={setSelectedCalendar}
        selectedCalendar={selectedCalendar}
        statusTime={statusTime}
        setStatusTime={setStatusTime}
      />
    </div>
  )
}
