import { useState } from 'react'
import Challenge from '../Challenge'
import Request from './modal'

export default function RequestChallenge() {
  const [challengeRequest, setChallengeRequest] = useState()
  return (
    <div>
      <h3 className="text-pink-500 font-semibold text-2xl">Thử thách theo yêu cầu</h3>
      <p className="text-justify text-pink-400 text-sm mt-1">Đặt thử thách cho nhau – vì tình yêu cũng cần chút mạo hiểm và không thiếu tiếng cười!</p>
      {
        challengeRequest ? <Challenge challenge={challengeRequest} /> : <Request setChallengeRequest={setChallengeRequest} />
      }
    </div>
  )
}
