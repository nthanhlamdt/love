import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Request({ setChallengeRequest }) {
  const [challege, setChallege] = useState({
    name: '',
    description: '',
    point: ''
  })

  const submitChallegeRequest = (e) => {
    e.preventDefault()
    if (!challege.name || !challege.description || !challege.point) {
      toast.error('Vui lòng nhập đầy đủ thông tin thử thách')
    }
    else {
      setChallengeRequest(challege)
    }
  }

  const arrayPoints = Array.from({ length: 30 }, (_, i) => (i + 1) * 5)
  return (
    <div className="border p-5 rounded-md mt-5 bg-pink-100 min-w-96">
      <div className='flex flex-col'>
        <div className="flex justify-between">
          <input
            type='text'
            placeholder='Tên thử thách'
            className="w-[49%] p-2 bg-white border-2 text-pink-500 border-pink-400 rounded-lg outline-2 outline-pink-500 hover:border-pink-500"
            value={challege.name}
            onChange={e => setChallege({ ...challege, name: e.target.value })}
          />

          <select
            className="w-[49%] p-2 text-pink-500 bg-white border-2 border-pink-400 rounded-lg outline-2 outline-pink-500 hover:border-pink-500"
            value={challege.point}
            onChange={e => setChallege({ ...challege, point: e.target.value })}
          >
            {arrayPoints.map(point => (
              <option className="text-pink-500" key={point} value={point}>{point} điểm</option>
            ))}
          </select>
        </div>

        <input
          type='text'
          placeholder='Mô tả thử thách'
          className="p-2 bg-white border-2 text-pink-500 border-pink-400 rounded-lg outline-2 outline-pink-500 hover:border-pink-500 my-2"
          value={challege.description}
          onChange={e => setChallege({ ...challege, description: e.target.value })}
        />

        <button
          className="p-2 bg-pink-500 text-white font-bold rounded-lg"
          onClick={submitChallegeRequest}
        >
          Gửi yêu cầu
        </button>
      </div>
    </div>
  )
}
