import { Link } from 'react-router-dom'

function DropdownAvatar({ setAuthUser }) {
  return (
    <ul className="menu menu-sm bg-pink-400 rounded-box z-[1] mt-2 w-52 p-2 shadow fixed right-5">
      <li className="text-white">
        <a className="justify-between">
          Thông tin cá nhân
        </a>
      </li>
      <li className="text-white"><a>Cài đặt</a></li>

      <li className="text-white">
        <Link
          to='/login'
          onClick={() => {
            setAuthUser('')
            // localStorage.removeItem('accessToken')
            // localStorage.removeItem('refreshToken')
            localStorage.removeItem('userInfo')
          }
          }
        >Đăng xuất</Link>
      </li>
    </ul>
  )
}

export default DropdownAvatar