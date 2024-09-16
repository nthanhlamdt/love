import CompletedChallenges from './CompletedChallenges'
import CoupleChallenge from './CoupleChallenge'
import IndividualChallenges from './IndividualChallenges'
import Leaderboard from './Leaderboard'

import { useState } from 'react'

export default function Challenges() {
  const [scores, setScores] = useState({
    player1: 75,
    player2: 80
  })

  const [sharedChallenge, setSharedChallenge] = useState({
    title: 'Đi xem phim cùng nhau',
    completed: false,
    evidence: null
  })

  const [dailyChallenge, setDailyChallenge] = useState({
    title: 'Nói Anh/Em yêu em/anh 5 lần',
    completed: false,
    evidence: null
  })

  const [history, setHistory] = useState([
    { title: 'Nấu bữa tối cùng nhau', date: '2023-06-01', type: 'shared' },
    { title: 'Gửi tin nhắn yêu thương', date: '2023-06-02', type: 'daily' },
    { title: 'Đi dạo trong công viên', date: '2023-06-03', type: 'shared' },
    { title: 'Đi dạo trong công viên', date: '2023-06-03', type: 'shared' }
  ])

  const handleEvidenceUpload = (challengeType, event) => {
    const file = event.target.files[0]
    if (file) {
      console.log(`Đã upload bằng chứng cho ${challengeType}:`, file.name)
      if (challengeType === 'shared') {
        setSharedChallenge(prev => ({ ...prev, evidence: file.name }))
      } else if (challengeType === 'daily') {
        setDailyChallenge(prev => ({ ...prev, evidence: file.name }))
      }
    }
  }

  const handleChallengeComplete = (challengeType) => {
    if (challengeType === 'shared' && sharedChallenge.evidence) {
      setSharedChallenge(prev => ({ ...prev, completed: true }))
      setHistory(prev => [{
        title: sharedChallenge.title,
        date: new Date().toISOString().split('T')[0],
        type: 'shared'
      }, ...prev])
      // Cập nhật điểm số ở đây
    } else if (challengeType === 'daily' && dailyChallenge.evidence) {
      setDailyChallenge(prev => ({ ...prev, completed: true }))
      setHistory(prev => [{
        title: dailyChallenge.title,
        date: new Date().toISOString().split('T')[0],
        type: 'daily'
      }, ...prev])
      // Cập nhật điểm số ở đây
    } else {
      alert('Vui lòng upload bằng chứng trước khi hoàn thành thử thách!')
    }
  }

  return (
    <div className='container m-auto md:px-16 px-7'>
      <div>
        <h1 className='text-4xl font-bold text-center mb-12 text-pink-600 animate-pulse'>
          ❤️ Thử Thách Tình Yêu ❤️
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Leaderboard scores={scores}/>

          <CoupleChallenge
            setDailyChallenge={setDailyChallenge}
            setSharedChallenge={setSharedChallenge}
            sharedChallenge= {sharedChallenge}
            handleChallengeComplete={handleChallengeComplete}
            handleEvidenceUpload={ handleEvidenceUpload }
          />

          <IndividualChallenges
            setDailyChallenge={setDailyChallenge}
            dailyChallenge={dailyChallenge}
            handleEvidenceUpload={handleEvidenceUpload}
            handleChallengeComplete={ handleChallengeComplete }
          />

          <CompletedChallenges history={ history } />
        </div>
      </div>
    </div>
  )
}
