import TypeChallegeHistory from './TypeChallegeHistory'

export default function HistoryChallenge() {

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className="text-pink-500 font-semibold text-2xl">Lịch sử nhiệm vụ</h3>
          <p className="text-justify text-pink-400 text-sm mt-1">Xem lại hôm nay ai đã khiến tình yêu thêm phần thú vị nào!</p>
        </div>
        <input type="date" className="ml-3 px-2 py-1 text-pink-600 outline-pink-600 border-pink-500 border rounded-md" />
      </div>

      <div className="overflow-hidden border px-3 py-2 rounded-md mt-5 bg-pink-100 min-w-96 flex flex-col items-end">
        <div className="grid grid-cols-2 w-full gap-2">
          <div>
            <h2 className='text-pink-700 font-bold text-2xl mb-2'>Bạn</h2>
            <div className="overflow-y-auto scroll-smooth snap-y snap-mandatory h-36">
              <TypeChallegeHistory />
              <TypeChallegeHistory />
              <TypeChallegeHistory />
            </div>
          </div>

          <div>
            <h2 className='text-pink-700 font-bold text-2xl mb-2'>Người yêu</h2>
            <div className="overflow-y-auto scroll-smooth snap-y snap-mandatory h-36">
              <TypeChallegeHistory />
              <TypeChallegeHistory />
              <TypeChallegeHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

