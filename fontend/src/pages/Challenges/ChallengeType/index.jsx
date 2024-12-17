import { ScrollText } from 'lucide-react'
import { useState } from 'react'
import EverydayChallenge from './EverydayChallenge'
import RequestChallenge from './RequestChallenge'
import HistoryChallenge from './HistoryChallenge'

export default function ChallengeType() {
  const [selectedChallenge, setSelectedChallenge] = useState('every')
  return (
    <div className='mt-16 lg:mt-0 flex-1 mr-0 lg:ml-5 xl:ml-10'>
      <div className='flex items-center text-pink-500 font-semibold text-4xl mb-5'>
        <ScrollText size={60} className='text-yellow-400'/>
        <h2>Thử thách</h2>
      </div>
      <div className='flex justify-between p-3 bg-pink-100 rounded-full'>
        <button
          className={`${selectedChallenge == 'every' ? 'bg-pink-500 text-white' : ''} p-2 flex-1 rounded-full text-pink-500 font-semibold hover:bg-pink-500 hover:text-white`}
          onClick={() => setSelectedChallenge('every')}
        >
          Hằng ngày
        </button>

        <button
          className={`${selectedChallenge == 'request' ? 'bg-pink-500 text-white': ''} p-2 flex-1 rounded-full text-pink-500 font-semibold hover:bg-pink-500 hover:text-white mx-1`}
          onClick={() => setSelectedChallenge('request')}
        >
          Yêu cầu
        </button>

        <button
          className={`${selectedChallenge == 'history' ? 'bg-pink-500 text-white': ''} p-2 flex-1 rounded-full text-pink-500 font-semibold hover:bg-pink-500 hover:text-white`}
          onClick={() => setSelectedChallenge('history')}
        >
          Lịch sử
        </button>
      </div>

      <div className='mt-5 px-8'>
        {selectedChallenge === 'every' && <EverydayChallenge />}
        {selectedChallenge === 'request' && <RequestChallenge />}
        {selectedChallenge === 'history' && <HistoryChallenge />}
      </div>
    </div>
  )
}
