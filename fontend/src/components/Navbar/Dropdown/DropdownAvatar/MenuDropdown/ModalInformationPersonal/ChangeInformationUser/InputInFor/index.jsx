import Label from '~/components/Label'

export default function InputInfor({ Icon, lable, value, onChange, type }) {
  // Hàm chuyển đổi từ yyyy-mm-dd sang dd/mm/yyyy
  const formatDateToDisplay = (date) => {
    if (!date) return ''
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  // Hàm chuyển đổi từ dd/mm/yyyy sang yyyy-mm-dd
  const formatDateToSubmit = (date) => {
    if (!date) return ''
    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`
  }

  // Xử lý khi người dùng thay đổi giá trị
  const handleChangeInput = (newValue) => {
    if (type === 'date') {
      // Chuyển đổi từ yyyy-mm-dd sang dd/mm/yyyy trước khi lưu vào state
      const formattedDate = formatDateToDisplay(newValue)
      onChange(formattedDate)
    } else {
      onChange(newValue)
    }
  }

  // Giá trị hiển thị trong input
  const inputValue = type === 'date' ? formatDateToSubmit(value) : value

  return (
    <div className="flex flex-col font-semibold text-pink-700">
      <Label title={lable} />
      <div className="flex items-center input m-0 input-bordered w-full text-pink-600">
        <span><Icon /></span>
        <input
          type={type}
          value={inputValue}
          onChange={(e) => handleChangeInput(e.target.value)}
          className="ml-2 py-2 px-1 w-full outline-none rounded-lg"
        />
      </div>
    </div>
  )
}