function CoupleChallenge({ setDailyChallenge, setSharedChallenge, sharedChallenge, handleChallengeComplete }) {
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

  return (
    <div className='bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden'>
      <div className='bg-pink-500 text-white p-4'>
        <h2 className='flex items-center text-2xl font-semibold'>
          <span className='mr-2' aria-hidden='true'>💖</span>
          Thử Thách Chung
        </h2>
      </div>
      <div className='p-6'>
        <div className='space-y-4'>
          <p className='text-lg font-medium text-pink-700'>{sharedChallenge.title}</p>
          <div className='flex items-center space-x-2'>
            <input
              type='file'
              id='shared-challenge-evidence'
              className='hidden'
              onChange={(e) => handleEvidenceUpload('shared', e)}
            />
            <label htmlFor='shared-challenge-evidence' className='cursor-pointer'>
              <div className='px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300 rounded-md flex items-center'>
                <span className='mr-2' aria-hidden='true'>📷</span> Upload Bằng Chứng
              </div>
            </label>
            {sharedChallenge.evidence && (
              <span className='text-sm text-pink-600'>{sharedChallenge.evidence}</span>
            )}
          </div>
          <button 
            onClick={() => handleChallengeComplete('shared')}
            disabled={sharedChallenge.completed}
            className={`w-full py-2 rounded-md ${
              sharedChallenge.completed
                ? 'bg-green-500 cursor-not-allowed'
                : 'bg-pink-500 hover:bg-pink-600'
            } text-white font-semibold`}
          >
            {sharedChallenge.completed ? 'Đã Hoàn Thành' : 'Hoàn Thành Thử Thách'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoupleChallenge
