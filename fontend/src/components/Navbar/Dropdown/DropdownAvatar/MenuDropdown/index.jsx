import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../../../context/authContext'
import { useState } from 'react'
import ModalInformationPersonal from './ModalInformationPersonal'

export default function MenuDropdown() {
  const { authUser, setAuthUser } = useAuthContext()
  const [isOpenInformationPerional, setIsOpenInformationPerional] = useState(false)
  return (
    <ul className="z-[9999] menu menu-sm bg-pink-400 rounded-box mt-2 w-52 p-2 shadow fixed right-5">
      <p className="text-white border-b-2 font-bold p-2">
        <a className="justify-between text-lg">
          {authUser.fullName}
        </a>
      </p>

      <li
        className="text-white"
        onClick={() => setIsOpenInformationPerional(!isOpenInformationPerional)}
      >
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
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('userLove')
          }
          }
        >Đăng xuất</Link>
      </li>

      {isOpenInformationPerional &&
        <ModalInformationPersonal setIsOpenInformationPerional={setIsOpenInformationPerional} />}
    </ul>
  )
}
