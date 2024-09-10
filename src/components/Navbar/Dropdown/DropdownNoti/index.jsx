
function DropdownNotification() {
  return (
    <ul className="menu menu-sm bg-pink-400 rounded-box z-[1] mt-3 w-72 p-2 shadow fixed right-5">
      <li
        className="text-white w-full block p-2 rounded-lg cursor-auto z-20"
        onClick={() => document.getElementById('modal_letter').showModal()}
      >
        <p >Thư mời hẹn hò đến từ Ngô Thành Lâm</p>
      </li>
    </ul>

  )
}

// export default DropdownAvatar
export default DropdownNotification