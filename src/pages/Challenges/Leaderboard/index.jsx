function Leaderboard({ scores }) {


  return (
    <div className='bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden'>
      <div className='bg-pink-500 text-white p-4'>
        <h2 className='flex items-center text-2xl font-semibold'>
          <span className='mr-2' aria-hidden='true'>🏆</span>
          Bảng Xếp Hạng
        </h2>
      </div>
      <div className='p-6'>
        <div className='space-y-6'>
          <div>
            <div className='flex justify-between mb-2 font-semibold text-pink-700'>
              <span>Người chơi 1</span>
              <span>{scores.player1} điểm</span>
            </div>
            <div className='h-3 bg-pink-200 rounded-full'>
              <div
                className='h-full bg-pink-500 rounded-full'
                style={{ width: `${scores.player1}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className='flex justify-between mb-2 font-semibold text-pink-700'>
              <span>Người chơi 2</span>
              <span>{scores.player2} điểm</span>
            </div>
            <div className='h-3 bg-pink-200 rounded-full'>
              <div
                className='h-full bg-pink-500 rounded-full'
                style={{ width: `${scores.player2}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
