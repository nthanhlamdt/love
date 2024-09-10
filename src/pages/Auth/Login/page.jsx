import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
// import { fetchLoginAPI } from '../../../apis'
import { useAuthContext } from '../../../context/authContext'
import { dataTest } from '../../../../Data/DATATEST'

function Page() {
  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const { setAuthUser } = useAuthContext()


  const submitFormLogin = async (e) => {
    e.preventDefault()
    if (!data.username || !data.password) {
      return toast.error('Vui lòng nhập đầy đủ thông tin')
    }

    const user = dataTest.users.find(user =>
      user.username === data.username && user.password === data.password
    )

    if (user) {
      const userLove = dataTest.users.find(user =>
        user._id === user.userLoveId
      )
      const userInfo = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        dateBirth: user.dateBirth,
        relationship_start_date: user.relationship_start_date,
        relationship_status: user.relationship_status,
        relationship_message: user.relationship_message,
        userLove: userLove
      }
      setAuthUser(userInfo)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      return toast.success('Đăng nhập thành công')
    } else {
      return toast.error('Tên đăng nhập hoặc mật khẩu không chính xác')
    }

    // await fetchLoginAPI(data)
    //   .then(res => {
    //     const userInfo = {
    //       id: res._id,
    //       username: res.username,
    //       avatar: res.avatar,
    //       fullName: res.fullName,
    //       gender: res.gender,
    //       phoneNumber: res.phoneNumber,
    //       relationship_start_date: res.relationship_start_date,
    //       relationship_status: res.relationship_status,
    //       relationship_user: res.relationship_user,
    //       relationship_message: res.relationship_message,
    //       userInforLove: res.userInforLove
    //     }
    //     localStorage.setItem('accessToken', res.accessToken) // Lưu token vào localStorage
    //     localStorage.setItem('refreshToken', res.refreshToken) // Lưu token vào localStorage
    //     localStorage.setItem('userInfo', JSON.stringify(userInfo)) // Lưu token vào localStorage
    //     setAuthUser(userInfo) // Cập nhật trạng thái người dùng
    //     toast.success('Đăng nhập thành công') // Hiển thị thông báo thành công
    //   })
  }

  return (
    <div
      className="bg-[url('/src/assets/Login_Backgroup.jpg')] bg-cover bg-center
      w-screen h-screen flex items-center justify-center"
    >
      <form
        className="bg-white bg-opacity-75 p-5 w-80 text-center rounded-lg flex flex-col items-center justify-center"
        onSubmit={submitFormLogin}
      >
        <h1 className="text-2xl font-bold mb-4 text-pink-600">Đăng nhập</h1>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          className="text-pink-600 w-full my-2 outline-none p-3 rounded-lg border-pink-200 border-2 focus:border-pink-400"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="text-pink-600 w-full my-2 outline-none p-3 rounded-lg border-pink-200 border-2 focus:border-pink-400"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Link className='self-end text-pink-600 text-xs mb-2'>Quên mật khẩu</Link>
        <button
          type="submit"
          className="btn bg-pink-600 text-white mb-5 w-full"
          onClick={() => submitFormLogin()}
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
