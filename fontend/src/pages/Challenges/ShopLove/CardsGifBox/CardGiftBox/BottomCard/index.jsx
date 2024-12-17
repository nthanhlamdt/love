export default function BottomCard({ giftbox }) {
  return (
    <div className='px-5 pb-5 pt-2 relative'>
      <div className='relative group'>
        <h2 className='text-2xl font-bold text-pink-700 mb-1 overflow-hidden text-ellipsis whitespace-nowrap'>{giftbox.name}</h2>
      </div>

      <div className='relative group'>
        <p className='text-pink-600 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>
          {giftbox.description}
        </p>
      </div>

      <div className="mt-4 flex justify-between">
        <span className="px-4 py-2 bg-pink-100 font-semibold rounded-2xl text-pink-600">{giftbox.point} điểm</span>
        <span className="hover:bg-pink-100 px-4 py-2 font-semibold rounded-md border border-pink-500 text-pink-600">Đặt hàng</span>

      </div>
    </div>
  )
}
