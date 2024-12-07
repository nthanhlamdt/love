function HistoryPicture({ picture }) {
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='flex max-w-[500px] w-[95%] justify-center items-center h-[90%] relative'>
        <div className='h-full rounded-3xl border-4 border-pink-500 bg-slate-700 overflow-hidden relative'>
          <img
            src={picture.src}
            className='w-full h-full object-cover object-center'
          />

          <div className='flex justify-center absolute bottom-0 top-0 right-0 left-0'>
            <span
              className='absolute bottom-32 bg-[rgba(249,168,212,0.3)] bg-pink-300 outline-none py-2 px-4 rounded-full text-white'
            >
              {picture.title}
              <span className='ml-3 text-slate-400'>1 giờ</span>
            </span>

            <div className='absolute bottom-16 bg-[rgba(0,0,0,0.5)] py-2 px-4 rounded-full flex justify-center items-center'>
              <img
                src={picture.src}
                className='rounded-full w-8 h-8 object-cover object-center'
              />

              <span className='text-white ml-2'>{picture.user}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPicture