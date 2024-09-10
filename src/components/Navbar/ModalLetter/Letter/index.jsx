import { useState } from 'react'

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full mx-auto border border-pink-300 rounded-lg overflow-hidden shadow-lg">
      <div
        className={`cursor-pointer p-4 bg-pink-400 flex items-center justify-between ${
          isOpen ? 'rounded-b-none' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-pink-300 flex items-center justify-center">
            <span className="text-white font-bold">JD</span>
          </div>
          <div className="grid gap-0.5 leading-none">
            <div className="font-semibold text-white">Người yêu</div>
            <div className="text-sm text-white">Gửi lúc 10:30 AM</div>
          </div>
        </div>
        <button className="bg-transparent border-0 p-0" onClick={() => setIsOpen(!isOpen)}>
          <ChevronDownIcon className={`w-4 h-4 text-pink-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen p-4 bg-pink-50' : 'max-h-0'
        }`}
      >
        <div className="space-y-4">
          <div className="text-sm text-pink-700">
            Anh yêu em rất nhiều. Em là người quan trọng nhất trong cuộc đời anh. Anh muốn được ở bên em mãi mãi.
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 border border-pink-300 rounded-md text-pink-700 hover:bg-pink-100">
              Từ chối
            </button>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
              Chấp nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

// eslint-disable-next-line no-unused-vars
function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}