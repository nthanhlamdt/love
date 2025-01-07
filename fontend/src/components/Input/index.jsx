export default function Input({ type, title, value, onChange }) {
  // Xử lý giá trị cho input type="date"
  const valueTime = type === 'date' ? new Date(value) : null
  const formattedValue =
    type === 'date' && valueTime instanceof Date && !isNaN(valueTime)
      ? valueTime.toISOString().split('T')[0] // Chuyển đổi Date thành YYYY-MM-DD
      : value

  return (
    <input
      type={type}
      placeholder={title}
      value={formattedValue || ''}
      required
      min={type === 'number' || type === 'range' ? '0' : undefined} // Chỉ áp dụng min cho number và range
      step={type === 'number' || type === 'range' ? 'any' : undefined} // Chỉ áp dụng step cho number và range
      onChange={onChange}
      className='input m-0 input-bordered w-full text-pink-500'
    />
  )
}