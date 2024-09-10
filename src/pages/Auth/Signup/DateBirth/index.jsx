import { useState, useEffect } from 'react'

function BirthdaySelector() {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1 // tháng bắt đầu từ 1
  const currentDay = today.getDate()

  const [selectedDay, setSelectedDay] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState(currentYear)

  const [days, setDays] = useState([])
  const [months, setMonths] = useState([])
  const [years, setYears] = useState([])

  useEffect(() => {
    // Cập nhật danh sách tháng và năm
    const validMonths = Array.from({ length: 12 }, (_, i) => i + 1)
    const validYears = Array.from({ length: 100 }, (_, i) => currentYear - i)

    setMonths(validMonths)
    setYears(validYears)
  }, [currentYear])

  useEffect(() => {
    // Cập nhật danh sách ngày khi tháng và năm thay đổi
    const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
    const calculateDaysInMonth = (month, year) => {
      if (!month || !year) return []
      if (month === 2) { // tháng 2
        return isLeapYear(year) ? Array.from({ length: 29 }, (_, i) => i + 1) : Array.from({ length: 28 }, (_, i) => i + 1)
      } else {
        return Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1)
      }
    }

    const daysInMonth = calculateDaysInMonth(selectedMonth, selectedYear)
    setDays(daysInMonth)

    // Điều chỉnh ngày nếu ngày hiện tại lớn hơn số ngày trong tháng mới
    if (selectedDay && selectedDay > daysInMonth.length) {
      setSelectedDay('')
    }
  }, [selectedMonth, selectedYear])

  const handleDayChange = (e) => setSelectedDay(e.target.value)
  const handleMonthChange = (e) => {
    const month = e.target.value
    setSelectedMonth(month)
    setSelectedDay('') // Reset ngày khi thay đổi tháng
  }
  const handleYearChange = (e) => {
    const year = e.target.value
    setSelectedYear(year)
    setSelectedMonth('') // Reset tháng khi thay đổi năm
    setSelectedDay('') // Reset ngày khi thay đổi năm
  }

  // Tạo danh sách tháng và năm hợp lệ
  const monthsOptions = months.filter(month => 
    selectedYear === currentYear ? month <= currentMonth : true
  )

  const yearsOptions = years.filter(year => 
    selectedMonth === '' || (year === currentYear && selectedMonth <= currentMonth) || year < currentYear
  )

  return (
    <div className="flex gap-4">
      <select
        className="text-pink-600 outline-none p-2 rounded-lg border-pink-200 border-2 focus:border-pink-400 overflow-auto"
        value={selectedDay}
        onChange={handleDayChange}
      >
        <option value="" disabled>Ngày</option>
        {days.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select
        className="text-pink-600 outline-none p-2 rounded-lg border-pink-200 border-2 focus:border-pink-400 overflow-auto"
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        <option value="" disabled>Tháng</option>
        {monthsOptions.map(m => (
          <option key={m} value={m}>{`Tháng ${m}`}</option>
        ))}
      </select>

      <select
        className="text-pink-600 outline-none p-2 rounded-lg border-pink-200 border-2 focus:border-pink-400 overflow-auto"
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="" disabled>Năm</option>
        {yearsOptions.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  )
}

export default BirthdaySelector
