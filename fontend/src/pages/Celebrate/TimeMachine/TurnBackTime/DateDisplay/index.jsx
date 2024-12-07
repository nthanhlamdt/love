import DateScroll from './DateScroll'

export default function DateDisplay({ selectedCalendar, statusTime }) {
  const dateNow = new Date()
  const day = statusTime ? dateNow.getDate() : 5
  const month = statusTime? dateNow.getMonth() + 1 : 3
  const year = statusTime? dateNow.getFullYear() : 2021

  const dayNumbers = Array.from({ length: 50 }, (_, i) => i % 31 + 1)
  const monthNumbers = Array.from({ length: 50 }, (_, i) => (i % 12) + 1 )

  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 30
  const yearNumbers = Array.from({ length: 60 }, (_, i) => (startYear + (i % 30) + 1))

  return (
    <div className='flex mb-1 p-2 rounded-lg'>
      <DateScroll
        selectedCalendar={selectedCalendar}
        lable={'Ngày'}
        numbers={dayNumbers}
        runningTime={7000}
        numberCurrent={day - 1}
        statusTime={statusTime}
      />
      <DateScroll
        selectedCalendar={selectedCalendar}
        lable={'Tháng'}
        numbers={monthNumbers}
        runningTime={6000}
        numberCurrent={month - 1}
        statusTime={statusTime}
      />
      <DateScroll
        selectedCalendar={selectedCalendar}
        lable={'Năm'}
        numbers={yearNumbers}
        runningTime={5000}
        numberCurrent={30 - (currentYear - year) - 1}
        statusTime={statusTime}
      />
    </div>
  )
}
