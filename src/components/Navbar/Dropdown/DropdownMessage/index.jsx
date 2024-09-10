function DropdownMessage() {
  return (
    <ul className="bg-pink-400 rounded-box z-[1] mt-3 w-72 p-2 shadow fixed right-5">
      <li className="text-white w-full block hover:bg-pink-500 p-2 rounded-lg cursor-pointer">
        <div className="flex justify-around items-center">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="avatar" />
            </div>
          </div>

          <div className="flex flex-col justify-center flex-1 overflow-hidden ml-2">
            <h1 className="whitespace-nowrap text-ellipsis overflow-hidden mb-1 font-bold">Ngô Thành Lâm</h1>
            <p className="whitespace-nowrap text-ellipsis overflow-hidden">Lâm: Xin chào bạn nhé adsdsad adsadadas</p>
          </div>
        </div>
      </li>
    </ul>
  )
}

export default DropdownMessage
