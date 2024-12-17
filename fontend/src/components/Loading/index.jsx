import { useState, useEffect } from 'react'

export default function Loading() {
  const [loadingText, setLoadingText] = useState('')
  const [isHappy, setIsHappy] = useState(true)

  const funnyTexts = [
    'Đang tạo bong bóng hạnh phúc... 🎈',
    'Đang thu thập những nụ cười... 😊',
    'Đang nạp năng lượng tích cực... ⚡',
    'Đang tìm cầu vồng... 🌈',
    'Đang pha chế cocktail vui vẻ... 🍹',
    'Đang lắc lắc niềm vui... 🎉'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(funnyTexts[Math.floor(Math.random() * funnyTexts.length)])
    }, 2000)

    return () => clearInterval(interval)
  })

  const toggleDogMood = () => {
    setIsHappy(!isHappy)
  }

  return (
    <div className='flex flex-col w-full h-full items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100'>
      <div className='w-64 h-64 cursor-pointer' onClick={toggleDogMood}>
        <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
          <g id='cute-dog'>
            {/* Body */}
            <ellipse cx='100' cy='130' rx='70' ry='60' fill='#F4A460' />

            {/* Head */}
            <circle cx='100' cy='80' r='50' fill='#F4A460' />

            {/* Ears */}
            <path d='M 60 70 Q 50 40 80 50' fill='#CD853F' />
            <path d='M 140 70 Q 150 40 120 50' fill='#CD853F' />

            {/* Eyes */}
            <circle cx='80' cy='75' r='10' fill='white' />
            <circle cx='120' cy='75' r='10' fill='white' />
            <circle cx='80' cy='75' r='5' fill='black'>
              <animate attributeName='cy' values='757375' dur='0.5s' repeatCount='indefinite' />
            </circle>
            <circle cx='120' cy='75' r='5' fill='black'>
              <animate attributeName='cy' values='757375' dur='0.5s' repeatCount='indefinite' />
            </circle>

            {/* Nose */}
            <ellipse cx='100' cy='95' rx='10' ry='7' fill='#8B4513' />

            {/* Mouth */}
            {isHappy ? (
              <path d='M 85 105 Q 100 120 115 105' stroke='#8B4513' strokeWidth='3' fill='none' />
            ) : (
              <path d='M 85 115 Q 100 100 115 115' stroke='#8B4513' strokeWidth='3' fill='none' />
            )}

            {/* Tongue */}
            {isHappy && (
              <path d='M 97 112 Q 100 120 103 112' fill='#FF69B4' stroke='#FF69B4' strokeWidth='2'>
                <animate attributeName='d' values='M 97 112 Q 100 120 103 112 M 97 110 Q 100 118 103 110 M 97 112 Q 100 120 103 112' dur='0.5s' repeatCount='indefinite' />
              </path>
            )}

            {/* Tail */}
            <path d='M 165 140 Q 180 120 190 140' stroke='#CD853F' strokeWidth='10' fill='none'>
              <animate attributeName='d' values='M 165 140 Q 180 120 190 140 M 165 140 Q 180 160 190 140 M 165 140 Q 180 120 190 140' dur='0.5s' repeatCount='indefinite' />
            </path>
          </g>
        </svg>
      </div>
      <p className='mt-8 text-2xl font-bold text-purple-600 text-center max-w-md'>
        {loadingText}
      </p>
      <div className='mt-4 flex space-x-2'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='w-3 h-3 bg-purple-400 rounded-full animate-bounce' style={{ animationDelay: `${i * 0.2}s` }}></div>
        ))}
      </div>
      <p className='mt-4 text-sm text-gray-600'>Click vào chú chó để thay đổi tâm trạng!</p>
    </div>
  )
}