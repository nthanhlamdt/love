function CompletedChallenges() {

  return (
    <div className='md:col-span-2 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden'>
      <div className='bg-pink-500 text-white p-4'>
        <h2 className='flex items-center text-2xl font-semibold'>
          <span className='mr-2' aria-hidden='true'>📜</span>
          Lịch Sử Nhiệm Vụ
        </h2>
      </div>
      <div className='p-6'>
        <ul className='space-y-2'>
          {history.map((item, index) => (
            <li key={index} className='flex items-center justify-between border-b border-pink-200 py-2 last:border-b-0'>
              <span className='text-pink-700'>
                {item.type === 'shared' ? '💖' : '✅'} {item.title}
              </span>
              <span className='text-sm text-pink-500'>{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CompletedChallenges
