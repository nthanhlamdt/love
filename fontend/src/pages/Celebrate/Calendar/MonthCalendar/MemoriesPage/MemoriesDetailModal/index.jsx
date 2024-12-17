import { Calendar, X } from 'lucide-react'

export default function MemoriesDetailModal({ anniversaryEvent, setShowDetailModal }) {
  const dateEvent = new Date(anniversaryEvent.memoryId.date)
  return (
    <div className="fixed z-[9999] inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
      <div className="relative max-w-[400px] w-[80%] bg-white p-5 rounded-lg text-pink-600">
        <X
          className='absolute right-2 top-2 cursor-pointer'
          size={16}
          onClick={() => setShowDetailModal(false)}
        />

        <h2 className="font-bold text-2xl">{anniversaryEvent.name}</h2>
        <img
          src={anniversaryEvent.image}
          className="w-full max-h-72 object-cover object-center rounded-md mt-4"
        />
        <p className='mt-2'>{anniversaryEvent.description}</p>
        <div className='flex justify-between items-center mt-4 text-xs'>
          <div className='flex items-center'>
            <img
              src={anniversaryEvent.userId.avatar}
              className='w-12 h-12 rounded-full mr-1'
            />
            <span>{anniversaryEvent.userId.fullName}</span>
          </div>

          <span className='flex items-center'><Calendar className='mr-1' />
            {dateEvent.getDate() < 10 ? '0' + dateEvent.getDate() : dateEvent.getDate()} tháng
            {dateEvent.getMonth() < 9 ? ' 0' + dateEvent.getMonth() + 1 : ' ' + (dateEvent.getMonth() + 1)},
            {' ' + anniversaryEvent.year}
          </span>
        </div>
      </div>
    </div>
  )
}
