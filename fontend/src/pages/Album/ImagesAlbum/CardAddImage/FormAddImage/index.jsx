import { Calendar, MapPin, Captions } from 'lucide-react'

export default function FormAddImage({ data, setData, formattedDate }) {
  return (
    <div className='absolute bottom-0 p-3 bg-[rgba(255,255,255,0.5)] w-full text-pink-400 text-xs'>
      <div className='flex items-center'>
        <Captions size={16} />
        <input
          type="text"
          value={data.name || ''} // Đảm bảo không có lỗi khi chưa có giá trị
          onChange={e => setData({ ...data, name: e.target.value })}
          placeholder='Tiêu đề ảnh'
          className='ml-1 bg-[rgba(255,255,255,0.2)] font-semibold placeholder-pink-500 outline-pink-500 px-2 py-1 text-xs text-pink-600 border-pink-500 border-2 rounded-md w-full'
        />
      </div>

      <div className='flex justify-between'>
        <p className='flex items-center my-1 w-[60%]'>
          <Calendar size={16} />
          <input
            type="date"
            value={data.time || formattedDate} // Đảm bảo giá trị không rỗng
            onChange={e => setData({ ...data, time: e.target.value })}
            className='ml-1 bg-[rgba(255,255,255,0.2)] outline-pink-500 placeholder-pink-500 font-semibold px-2 py-1 text-xs text-pink-600 border-pink-500 border-2 rounded-md w-full'
          />
        </p>

        <p className='flex items-center w-[40%]'>
          <MapPin size={16} />
          <input
            type="text"
            value={data.location || ''} // Đảm bảo không có lỗi khi chưa có giá trị
            onChange={e => setData({ ...data, location: e.target.value })}
            placeholder='Địa điểm'
            className='ml-1 bg-[rgba(255,255,255,0.2)] placeholder-pink-500 outline-pink-500 font-semibold px-2 py-1 text-xs text-pink-600 border-pink-500 border-2 rounded-md w-full'
          />
        </p>
      </div>
    </div>
  )
}
