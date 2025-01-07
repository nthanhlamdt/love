export default function Select({ title, options, onChange }) {
  return (
    <select
      onChange={onChange}
      className="select select-bordered w-full max-w-xs"
      required
    >
      <option className="bg-pink-100" disabled>{title}</option>
      {
        options.map((option, index) => {
          return <option key={index} value={option}>{option}</option>
        })
      }
    </select>
  )
}
