import { Link } from 'react-router-dom'
import Checkbox from '../../../components/CheckBox'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DateBirth from './DateBirth'
import { dataTest } from '../../../../Data/DATATEST'

function Page() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    gender: '',
    dateBirth: ''
  })

  const submitFormSignUp = async (e) => {
    e.preventDefault()
    const regex = /^(0[3|5|7|8|9])+([0-9]{8})$/
    if (!data.username || !data.password || !data.confirmPassword
      || !data.fullName || !data.gender || !data.phoneNumber) {
      return toast.error('Vui lòng nhập đầy đủ thông tin')
    }
    else if (data.password.length <= 8 || data.confirmPassword.length <= 8) {
      return toast.error('Mật khẩu quá ngắn')
    }
    else if (data.password !== data.confirmPassword) {
      return toast.error('Mật khẩu không trùng khớp')
    }
    else if (!regex.test(data.phoneNumber)) {
      return toast.error('Số điện thoại không hợp lệ')
    }
    else {
      dataTest.users.push(data)
      toast.success('Đăng kí tài khoản thành công')
      navigate('/login')
    }
  }

  return (
    <div
      className="bg-[url('/src/assets/Login_Backgroup.jpg')] bg-cover bg-center
      w-screen h-screen flex items-center justify-center"
      onSubmit={submitFormSignUp}
    >
      <form className="bg-white bg-opacity-75 p-5 w-80 text-center rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-pink-600">Đăng Ký</h1>

        <input
          type="text"
          placeholder="Họ Tên"
          className="text-pink-600 w-full my-1 outline-none p-2 rounded-lg border-pink-200 border-2 focus:border-pink-400"
          value={data.fullName}
          onChange={(e) => setData({ ...data, fullName: e.target.value })}
        />

        <input
          type="text"
          placeholder="Số Điện Thoại"
          className="text-pink-600 w-full my-1 outline-none p-2 rounded-lg border-pink-200 border-2 focus:border-pink-400"
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
        />

        <input
          type="password"
          autoComplete='Password'
          placeholder="Mật khẩu"
          className="text-pink-600 w-full my-1 outline-none p-2 rounded-lg border-pink-200 border-2 focus:border-pink-400"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <input
          type="password"
          autoComplete='confirmPassword'
          placeholder="Nhập Lại Mật khẩu"
          className="text-pink-600 w-full my-1 outline-none p-2 rounded-lg border-pink-200 border-2 focus:border-pink-400"
          value={data.confirmPassword}
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        />

        <span className='text-start block text-sm text-pink-500 ml-1'>Ngày sinh</span>
        <DateBirth data={data} setData={setData} />

        <span className='text-start block text-sm text-pink-500 ml-1'>Giới tính</span>
        <Checkbox data={data} setData={setData} />

        <button
          // to='/home'
          type='submit'
          className="btn bg-pink-600 text-white mb-5 w-full mt-2"
          onClick={() => submitFormSignUp()}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              submitFormSignUp(data)
            }
          }}
        >
          Đăng Ký
        </button>
        <span className=" text-xs">
          Bạn đã có tài khoản? <Link className="text-pink-600 underline" to='/login'>Đăng nhập</Link>
        </span>
      </form>
    </div>
  )
}

export default Page
