import { SkipForward, Upload } from 'lucide-react'
import { useState } from 'react'
import FirstDayChallenge from './FistDayChallenge'
import UploadChallenge from './UploadChallenge'
import QuestionChallenge from './QuestionChallenge'

export default function Challenge({ challenge, setQuestionNumber }) {
  const [performChallenges, setPerformChallenges] = useState(false)

  return (
    <div className="border p-5 rounded-md mt-5 bg-pink-100 min-w-96">
      <h4 className="text-pink-500 font-semibold text-xl">{challenge.name}</h4>
      <p className="text-justify text-pink-400 text-lg">{challenge.description}</p>
      <div className="mt-5 flex justify-between items-center">
        <span className="font-semibold text-pink-500 text-2xl">{challenge.point} điểm</span>
        <div className='flex'>
          {
            challenge.type !== 'fisrtChallenges' && (
              <button
                className="flex items-center mr-3 border border-pink-500 bg-white text-pink-500 font-semibold py-2 px-3 rounded-lg hover:bg-gray-100"
                onClick={() => setQuestionNumber(prev => prev+1)}
              >
                <SkipForward size={20} className='hidden sm:block'/>
                <span className='ml-0 sm:ml-1'>Bỏ qua</span>
              </button>
            )
          }

          <button
            className='flex items-center px-3 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold'
            onClick={() => setPerformChallenges(true)}
          >
            <Upload size={20} className='hidden sm:block'/>
            <span className='ml-0 sm:ml-1'>Thực hiện</span>
          </button>
        </div>
      </div>

      {
        performChallenges && (
          (() => {
            switch (challenge.type) {
            case 'fisrtChallenges':
              return <FirstDayChallenge
                setPerformChallenges={setPerformChallenges}
                setQuestionNumber={setQuestionNumber}
                challenge={challenge}
              />

            case 'challenge':
              return <UploadChallenge
                setPerformChallenges={setPerformChallenges}
              />

            default:
              return <QuestionChallenge
                setPerformChallenges={setPerformChallenges}
                challenge={challenge}
              />
            }
          })()
        )
      }
    </div>
  )
}
