import { useState } from 'react'

export default function Emoji({ setDataType, dataType }) {
  const [emojiIndex, setEmojiIndex] = useState(0)

  const coupleEmojis = [
    {
      category: 'Tình Yêu',
      icon: '❤️', // Trái tim đỏ (biểu tượng phổ biến cho tình yêu)
      emojis: [
        '❤️', '💕', '💖', '💗', '💓', '💘', '💝', '💌', '❣️', '💙', '💚',
        '💛', '💜', '🧡', '🖤', '🤍', '🤎', '💑', '💏', '🥰', '😍', '😘', '😻'
      ]
    },
    {
      category: 'Cặp Đôi',
      icon: '👩‍❤️‍👨', // Biểu tượng cặp đôi nữ và nam (hôn nhau)
      emojis: [
        '👩‍❤️‍👨', '👩‍❤️‍👩', '👨‍❤️‍👨', '👩‍❤️‍💋‍👨', '👫', '👬', '👭',
        '🫂', '💏', '🥂', '💍', '🌹', '🌻', '🍷', '💃', '🕺', '🎶', '🎵', '🍫', '🎁',
        '🍓', '🛋️'
      ]
    },
    {
      category: 'Hành Động',
      icon: '💋', // Biểu tượng nụ hôn
      emojis: [
        '💋', '💑', '💘', '🥰', '😘', '😻', '🫶', '👀', '🤗', '💏', '🎶',
        '🎵', '🍷', '🍴', '🥂', '🌙', '🧑‍🤝‍🧑', '🛀', '🛋️', '🐱', '🌄', '🎥', '🍫'
      ]
    },
    {
      category: 'Lâu Dài',
      icon: '💍', // Biểu tượng nhẫn cưới
      emojis: [
        '🏠', '💍', '👨‍👩‍👧‍👦', '🛏️', '🏡', '💒', '👪', '🍼', '🎂', '📅',
        '🗝️', '🛀', '📸', '🌿', '🍰', '🍷', '🕯️', '🌱', '🧳', '🎡', '🧩'
      ]
    },
    {
      category: 'Yêu Xa',
      icon: '🌍', // Biểu tượng trái đất (cho tình yêu không biên giới)
      emojis: [
        '🌍', '✈️', '📱', '💌', '🌙', '📞', '📝', '💬', '🧳', '🎥', '🌎',
        '🏙️', '💻', '🛸', '⏳', '🎤', '📸', '🧩', '🕰️', '🎶', '💭', '💙'
      ]
    },
    {
      category: 'Hạnh Phúc',
      icon: '🎉', // Biểu tượng ăn mừng (cho niềm vui trong tình yêu)
      emojis: [
        '🥰', '😘', '😍', '😻', '🥂', '🍷', '🌸', '🎉', '🏖️',
        '🎁', '🎈', '🌺', '✨', '🌞', '🍩', '🎶', '🎡', '🍓', '🌼', '💐', '🍰'
      ]
    }
  ]
  return (
    <div className="absolute flex flex-col bg-white bottom-14 p-1 right-2 max-w-64 max-h-48 border border-pink-500 rounded-lg overflow-y-auto">
      <div className="grid grid-cols-7 gap-1 overflow-y-auto">
        {coupleEmojis[emojiIndex].emojis.map((emoji, index) => (
          <div
            key={index}
            className="text-center text-2xl hover:bg-pink-100 cursor-pointer"
            onClick={() => {
              setDataType({ ...dataType, icon: emoji })
            }}
          >
            {emoji}
          </div>
        )) }
      </div>

      <hr className='my-1'/>
      <div className=''>
        {coupleEmojis.map((icons, index) => (
          <span
            key={index}
            className={`text-center text-2xl hover:bg-pink-100 cursor-pointer ${emojiIndex == index && 'bg-pink-100'}`}
            onClick={() => setEmojiIndex(index)}
          >
            {icons.icon}
          </span>
        ))}
      </div>
    </div>
  )
}
