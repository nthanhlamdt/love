function IndividualChallenges({ setDailyChallenge }) {
  const generateNewDailyChallenge = () => {
    setDailyChallenge({
      title: 'Thử thách mới: Nấu bữa tối cùng nhau',
      completed: false,
      evidence: null
    })
  }

  return (
    <div className='md:col-span-2 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden'>
      <div className='bg-pink-500 text-white p-4'>
        <h2 className='flex items-center text-2xl font-semibold'>
          <span className='mr-2' aria-hidden='true'>✅</span>
          Thử Thách Hàng Ngày
        </h2>
      </div>
      <div className='p-6'>
        <div className='space-y-4'>
          <p className='text-lg font-medium text-pink-700'>{dailyChallenge.title}</p>
          <div className='flex items-center space-x-2'>
            <input
              type='file'
              id='daily-challenge-evidence'
              className='hidden'
              onChange={(e) => handleEvidenceUpload('daily', e)}
            />
            <label htmlFor='daily-challenge-evidence' className='cursor-pointer'>
              <div className='px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300 rounded-md flex items-center'>
                <span className='mr-2' aria-hidden='true'>📷</span> Upload Bằng Chứng
              </div>
            </label>
            {dailyChallenge.evidence && (
              <span className='text-sm text-pink-600'>{dailyChallenge.evidence}</span>
            )}
          </div>
          <div className='flex space-x-2'>
            <button 
              onClick={() => handleChallengeComplete('daily')}
              disabled={dailyChallenge.completed}
              className={`flex-1 py-2 rounded-md ${
                dailyChallenge.completed
                  ? 'bg-green-500 cursor-not-allowed'
                  : 'bg-pink-500 hover:bg-pink-600'
              } text-white font-semibold`}
            >
              {dailyChallenge.completed ? 'Đã Hoàn Thành' : 'Hoàn Thành Thử Thách'}
            </button>
            {dailyChallenge.completed && (
              <button
                onClick={generateNewDailyChallenge}
                className='px-4 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-md font-semibold flex items-center'
              >
                <span className='mr-2' aria-hidden='true'>🔄</span> Thử Thách Mới
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualChallenges
