import { useState } from 'react'
import Challenge from '../Challenge'

export default function EverydayChallenge() {
  const [questionNumber, setQuestionNumber] = useState(0)
  const challenge = [
    {
      id: 1,
      name: 'Câu hỏi đầu ngày',
      description: 'Hãy khởi động ngày mới với một vài câu hỏi về bạn',
      point: '30',
      type: 'fisrtChallenges',
      questions: [
        {
          id: 1,
          questionText: 'Bạn yêu đối phương ở điểm gì?',
          answer: [
            'Đẹp',
            'Cá tính',
            'Dễ thương',
            'Khác'
          ]
        }
      ]
    },

    {
      name: 'Ăn cơm',
      description: 'Cùng nhau ăn cơm',
      point: '30',
      type: 'challenge'
    },

    {
      name: 'Câu hỏi',
      description: 'Trả lời câu hỏi để xem bạn hiểu đối phương cở nào',
      point: '30',
      type: 'question',
      question: {
        questionText: 'Bạn yêu đối phương ở điểm gì?',
        answer: [
          'Đẹp',
          'Cá tính',
          'Dễ thương',
          'Khác'
        ]
      }
    }
  ]
  return (
    <div>
      <h3 className="text-pink-500 font-semibold text-2xl">Thử thách hằng ngày</h3>
      <p className="text-justify text-pink-400 text-sm mt-1">Hoàn thành nhiệm vụ hằng ngày để gắn kết tình yêu của hai bạn!</p>
      <Challenge challenge={challenge[questionNumber]} setQuestionNumber={setQuestionNumber} />
    </div>
  )
}
