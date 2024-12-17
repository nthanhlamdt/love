export default function InforMessage() {
  return (
    <div>
      <div className="p-2 flex items-center">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <div className="flex flex-col ml-2">
          <span className="text-xl font-semibold text-pink-700">Ngô Thành Lâm</span>
          <span className="text-sm text-pink-600">Sinh nhật: 30/03/2004</span>
        </div>
      </div>
      <hr/>
    </div>
  )
}
