function HeaderCalendar({ currentDate, setCurrentDate }) {
  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={handlePrevious}
        className="px-4 py-2 border border-pink-300 rounded-md bg-pink-100 text-pink-600 hover:bg-pink-200"
      >
        Previous
      </button>

      <h2 className="text-xl font-bold text-pink-600">
        {currentDate.toLocaleDateString('Vi', { month: 'long', year: 'numeric' })}
      </h2>

      <button
        onClick={handleNext}
        className="px-4 py-2 border border-pink-300 rounded-md bg-pink-100 text-pink-600 hover:bg-pink-200"
      >
        Next
      </button>
    </div>
  )
}

export default HeaderCalendar