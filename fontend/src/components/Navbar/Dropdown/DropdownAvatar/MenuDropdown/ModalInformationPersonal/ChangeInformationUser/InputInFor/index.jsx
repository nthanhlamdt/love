export default function InputInfor({ Icon, lable, value, onChange }) {
  return (
    <div className="flex flex-col">
      <span>{ lable }</span>
      <div className="flex items-center mt-2 px-2 border-2 border-pink-500 rounded-lg" >
        <span><Icon /></span>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="ml-2 py-2 px-1 w-full outline-none rounded-lg"
        />
      </div>
    </div>

  )
}
