import { motion } from 'framer-motion'
import Calendar from './Calendar'
import { useState } from 'react'
import TimeMachine from './TimeMachine'

export default function Celebrate() {
  const [selectedCalendar, setSelectedCalendar] = useState(true)
  return (
    <motion.div
      className="w-screen h-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[90%] md:max-w-[80%] h-full mx-auto py-5">

        {selectedCalendar ?
          <div className='h-full lg:flex lg:justify-center lg:items-center'>
            <Calendar
              setSelectedCalendar={setSelectedCalendar}
            />
          </div>
          : <TimeMachine
            selectedCalendar={selectedCalendar}
            setSelectedCalendar={setSelectedCalendar} />}
      </div>
    </motion.div>
  )
}
