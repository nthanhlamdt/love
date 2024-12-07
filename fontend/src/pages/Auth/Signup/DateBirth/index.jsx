/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'

export default function index({ data, setData }) {
  const now = new Date()
  const yearNow = now.getFullYear()

  const [day, setDay] = useState('1')
  const [month, setMonth] = useState('1')
  const [year, setYear] = useState(yearNow)

  useEffect(() => {
    setData({ ...data, dateBirth: `${day < 10? '0' + day: day}-${month < 10? '0' + month: month}-${year}` })
  }, [day, month, year])

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
  }

  const getDayQuanlity = () => {
    var dayQuanlity
    if (month == 2 && isLeapYear(year)) {
      dayQuanlity = 29
    }
    else if (month == 2 ) {
      dayQuanlity = 28
    }
    else if (month == 4 || month == 6 || month == 9 || month == 11) {
      dayQuanlity = 30
    }

    else {
      dayQuanlity = 31
    }
    return dayQuanlity
  }

  const years = Array.from({ length: 101 }, (_, index) => yearNow - index)
  const months = Array.from({ length: 12 }, (_, index) => 1 + index)
  const days = Array.from({ length: getDayQuanlity() }, (_, index) => 1 + index)
  return (
    <div className="flex gap-4">
      <select
        className="text-pink-600 outline-none p-2 rounded-lg border-pink-200 border-2 focus:border-pink-400 overflow-auto"
        onChange={(e) => {
          setDay(e.target.value)
        }}
      >
        <option value="" disabled>Ngày</option>
        {days.map((day) => (
          <option key={day} value={day}>{day}</option> // Thêm giá trị và nội dung cho từng năm
        ))}
      </select>

      <select
        className="text-pink-600 outline-none p-2 rounded-lg border-pink-200 border-2 focus:border-pink-400 overflow-auto"
        onChange={(e) => {
          setMonth(e.target.value)
        }}
      >
        <option value="" disabled>Tháng</option>
        {months.map((month) => (
          <option key={month} value={month}>{month}</option> // Thêm giá trị và nội dung cho từng năm
        ))}
      </select>

      <select
        className="text-pink-600 outline-none p-2 rounded-lg border-pink-200 border-2 focus:border-pink-400 overflow-auto"
        onChange={(e) => {
          setYear(e.target.value)
        }}
      >
        <option value="" disabled>Năm</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option> // Thêm giá trị và nội dung cho từng năm
        ))}
      </select>
    </div>
  )
}
