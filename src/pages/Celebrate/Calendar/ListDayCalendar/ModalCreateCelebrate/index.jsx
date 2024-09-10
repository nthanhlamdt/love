import { useState } from 'react'
import { Heart, Sparkles, Coffee, Gift, Music, Camera, MessageCircle } from 'lucide-react'

export default function ModalCreateCelebrate({ id, data, date }) {
  const [memory, setMemory] = useState({
    title: data?.title,
    description: data?.description,
    emotion: data?.emotion
  })

  const emotions = [
    { icon: Heart, label: 'Yêu thương' },
    { icon: Sparkles, label: 'Hạnh phúc' },
    { icon: Coffee, label: 'Ấm áp' },
    { icon: Gift, label: 'Biết ơn' },
    { icon: Music, label: 'Lãng mạn' },
    { icon: Camera, label: 'Đáng nhớ' },
    { icon: MessageCircle, label: 'Gần gũi' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMemory((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmotionSelect = (emotion) => {
    setMemory((prev) => ({ ...prev, emotion }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Xử lý việc lưu kỷ niệm ở đây
  }

  return (
    <dialog id={id} className='modal'>
      <div className='flex items-center justify-center p-4 relative'>
        <form method='dialog'>
          <button className='absolute right-8 top-8'>✕</button>
        </form>
        <div className='bg-pink-100 rounded-3xl p-8 w-full max-w-md shadow-xl text-start'>
          <h1 className='text-3xl font-bold text-pink-700 mb-6 text-center'>
            Khoảnh Khắc Yêu Thương
          </h1>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='title' className='block text-pink-600'>Ngày Kỷ Niệm</label>
              <div
                className='bg-slate-100 border-pink-300 text-pink-700 placeholder-pink-300 rounded-lg p-2 w-full'
              >
                {date}
              </div>
            </div>

            <div>
              <label htmlFor='title' className='block text-pink-600'>Tên kỷ niệm</label>
              <input
                id='title'
                name='title'
                value={memory.title}
                onChange={handleInputChange}
                className='bg-white border-pink-300 text-pink-700 placeholder-pink-300 rounded-lg p-2 w-full'
                placeholder='Ví dụ: Buổi hẹn hò đầu tiên'
              />
            </div>
            <div>
              <label htmlFor='description' className='block text-pink-600'>Mô tả khoảnh khắc {memory.description}</label>
              <textarea
                id='description'
                name='description'
                value={memory.description}
                onChange={handleInputChange}
                className='bg-white border-pink-300 text-pink-700 placeholder-pink-300 rounded-lg p-2 w-full min-h-[100px]'
                placeholder='Hãy chia sẻ những cảm xúc và chi tiết đáng nhớ...'
              />
            </div>
            <div>
              <label className='text-pink-600 mb-2 block'>Cảm xúc</label>
              <div className='flex flex-wrap gap-2'>
                {emotions.map((emotion) => (
                  <button
                    key={emotion.label}
                    type='button'
                    className={`bg-white hover:bg-opacity-70 text-pink-600 border-pink-400 
                      ${memory.emotion === emotion.label ? 'ring-2 ring-pink-400' : ''} flex items-center gap-2 rounded-lg p-2`}
                    onClick={() => handleEmotionSelect(emotion.label)}
                  >
                    <emotion.icon className='h-4 w-4' />
                    {emotion.label}
                  </button>
                ))}
              </div>
            </div>
            <div className='flex justify-center'>
              <button type='submit' className='w-full bg-pink-500 hover:bg-pink-600 text-white rounded-lg p-2 flex items-center justify-center'>
                <Heart className='h-5 w-5 mr-2' />
                <span>Lưu Kỷ Niệm</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}
