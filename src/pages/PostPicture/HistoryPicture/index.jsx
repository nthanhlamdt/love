function HistoryPicture() {
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='flex w-full justify-center items-center h-[90%] relative'>
        <div className='h-full rounded-3xl max-w-md w-[95%] border-4 border-pink-500 bg-slate-700 overflow-hidden relative'>
          <img
            src='https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/428612755_411073891393500_5432439734118428374_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH2kWMeA4lLErOZdtScM6QlmtpI9eJbTh2a2kj14ltOHQqAQoPtzk0hq8EFeob4aIxLqL4Q5nTv0OD6FvGd5uoH&_nc_ohc=kTyJ5Bu_mwsQ7kNvgEf-iwS&_nc_ht=scontent.fdad1-3.fna&_nc_gid=AQL5WPDhlDPm2Vgt2Nk_jIC&oh=00_AYASVxotDsqomwrJ3ldauWQ4qPvXEQgwvEXAkOKcXtDFEw&oe=66ED97B4'
            className='w-full h-full object-cover object-center'
          />

          <div className='flex justify-center absolute bottom-0 top-0 right-0 left-0'>
            <span
              className='absolute bottom-32 bg-[rgba(249,168,212,0.5)] bg-pink-300 outline-none py-2 px-4 rounded-full text-white'
            >
              Hello các cậu
              <span className='ml-3 text-slate-400'>1 giờ</span>
            </span>

            <div className='absolute bottom-16 bg-[rgba(0,0,0,0.5)] py-2 px-4 rounded-full flex justify-center items-center'>
              <img
                src='https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/428612755_411073891393500_5432439734118428374_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH2kWMeA4lLErOZdtScM6QlmtpI9eJbTh2a2kj14ltOHQqAQoPtzk0hq8EFeob4aIxLqL4Q5nTv0OD6FvGd5uoH&_nc_ohc=kTyJ5Bu_mwsQ7kNvgEf-iwS&_nc_ht=scontent.fdad1-3.fna&_nc_gid=AQL5WPDhlDPm2Vgt2Nk_jIC&oh=00_AYASVxotDsqomwrJ3ldauWQ4qPvXEQgwvEXAkOKcXtDFEw&oe=66ED97B4'
                className='rounded-full w-8 h-8'
              />

              <span className='text-white ml-2'>Ngô Thành Lâm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPicture