import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../../../api/api'
import { useAuthContext } from '../../../context/authContext'
import { toast } from 'react-toastify'

function Page() {
  const { setAuthUser } = useAuthContext()

  const [data, setData] = useState({
    phoneNumber: '',
    password: ''
  })

  const submitFormLogin = async (e) => {
    e.preventDefault()

    if (!data.phoneNumber || !data.password) {
      return toast.error('Vui lòng nhập đầy đủ thông tin')
    }

    else {
      loginUser(data)
        .then((dt) => {
          const expiryDate = Date.now() + 15 * 24 * 60 * 60 * 1000
          localStorage.setItem('token', JSON.stringify(dt.token))
          localStorage.setItem('user', JSON.stringify(dt.user))
          localStorage.setItem('tokenExpiry', expiryDate)
          toast.success('Đăng nhập thành công')
          setAuthUser(dt.user)
        })
        .catch(error => {
          toast.error(error?.response?.data?.message || 'Đăng nhập thất bại')
        })
    }
  }

  return (
    <div
      className="bg-[url('/assets/Login_Backgroup.jpg')] bg-cover bg-center
      w-screen h-screen flex items-center justify-center"
    >
      <form
        onSubmit={submitFormLogin}
        className="bg-white bg-opacity-75 p-5 w-80 text-center rounded-lg flex flex-col items-center justify-center"
      >
        <h1 className="text-2xl font-bold mb-4 text-pink-600">Đăng nhập</h1>
        <input
          type="text"
          placeholder="Số điện thoại"
          className="text-pink-600 w-full my-2 outline-none p-3 rounded-lg border-pink-200 border-2 focus:border-pink-400"
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="text-pink-600 w-full my-2 outline-none p-3 rounded-lg border-pink-200 border-2 focus:border-pink-400"
          autoComplete='tel'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Link className='self-end text-pink-600 text-xs mb-2'>Quên mật khẩu</Link>
        <button
          type="submit"
          className="btn bg-pink-600 text-white mb-5 w-full"
          onSubmit={submitFormLogin}
        >
          Đăng nhập
        </button>
        <span className="text-xs">
          Bạn không có tài khoản? <Link className="text-pink-600 underline" to='/signup'>Đăng ký</Link>
        </span>
      </form>
    </div>
  )
}

export default Page
