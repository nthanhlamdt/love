/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import { FaBell } from 'react-icons/fa'
import { BiSolidMessageRounded } from 'react-icons/bi'
import DropdownAvatar from './Dropdown/DropdownAvatar'
import DropdownMessage from './Dropdown/DropdownMessage'
import DropdownNotification from './Dropdown/DropdownNoti'
import ModalLetter from './ModalLetter'

function index() {
  const { authUser, setAuthUser } = useAuthContext()
  const [isMessageDropdownOpen, setIsMessageDropdownOpen] = useState(false)
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false)
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)

  const messageDropdownRef = useRef(null)
  const notificationDropdownRef = useRef(null)
  const avatarDropdownRef = useRef(null)

  const handleClickOutside = (event) => {
    if (messageDropdownRef.current && !messageDropdownRef.current.contains(event.target)) {
      setIsMessageDropdownOpen(false)
    }
    if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
      setIsNotificationDropdownOpen(false)
    }
    if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(event.target)) {
      setIsAvatarDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex justify-between bg-pink-600 text-white">
      <div className="navbar-start text-white">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                className="text-white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-pink-400 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li className="text-white"><Link to='/'>Trang Chủ</Link></li>
            <li className="text-white"><Link to='/album'>Album Ảnh</Link></li>
            <li className="text-white"><Link to='celebrate'>Kỷ Niệm</Link></li>
            <li className="text-white"><Link to='challenges'>Thử Thách</Link></li>
            <li className="text-white"><Link to='/cooking'>Nấu Ăn</Link></li>
            <li className="text-white"><Link to='/learning'>Học Tập</Link></li>
            <li className="text-white"><Link to='/timeCapsule'>Hộp Thời Gian</Link></li>
            <li className="text-white"><Link to='/postPicture'>Đăng Ảnh</Link></li>
            <li className="text-white"><Link to='/virtualGifts'>Quà Tặng</Link></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">ForLove</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="text-white"><Link to='/'>Trang Chủ</Link></li>
          <li className="text-white"><Link to='/album'>Album Ảnh</Link></li>
          <li className="text-white"><Link to='celebrate'>Kỷ Niệm</Link></li>
          <li className="text-white"><Link to='challenges'>Thử Thách</Link></li>
          <li className="text-white"><Link to='/cooking'>Nấu Ăn</Link></li>
          <li className="text-white"><Link to='/learning'>Học Tập</Link></li>
          <li className="text-white"><Link to='/timeCapsule'>Hộp Thời Gian</Link></li>
          <li className="text-white"><Link to='/postPicture'>Đăng Ảnh</Link></li>
          <li className="text-white"><Link to='/virtualGifts'>Quà Tặng</Link></li>
        </ul>
      </div>

      <div className="w-36 flex items-center mx-10 dropdown dropdown-end justify-end">
        <div className="w-36 flex items-center mx-10 dropdown dropdown-end justify-end">
          <div ref={messageDropdownRef} className='relative'>
            <div
              className='cursor-pointer rounded-full bg-pink-500 hover:bg-pink-400 w-8 h-8 flex items-center justify-center'
              onClick={() => {
                setIsMessageDropdownOpen(!isMessageDropdownOpen)
                setIsAvatarDropdownOpen(false)
                setIsNotificationDropdownOpen(false)
              }}
            >
              <BiSolidMessageRounded/>
            </div>
            {isMessageDropdownOpen && (<DropdownMessage />)}
          </div>

          <div ref={notificationDropdownRef} className='relative'>
            <div
              className='cursor-pointer rounded-full bg-pink-500 hover:bg-pink-400 w-8 h-8 flex items-center justify-center mx-3'
              onClick={() => {
                setIsMessageDropdownOpen(false)
                setIsAvatarDropdownOpen(false)
                setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
              }}
            >
              <FaBell/>
            </div>
            {isNotificationDropdownOpen && (<DropdownNotification />)}
          </div>

          <div ref={avatarDropdownRef} className='relative'>
            <div
              className="btn btn-ghost btn-circle avatar"
              onClick={() => {
                setIsMessageDropdownOpen(false)
                setIsAvatarDropdownOpen(!isAvatarDropdownOpen)
                setIsNotificationDropdownOpen(false)
              }}
            >
              <div className="w-10 rounded-full">
                <img alt="avatar" src={authUser?.avatar} />
              </div>
            </div>
            {isAvatarDropdownOpen && (<DropdownAvatar setAuthUser={setAuthUser} />)}
          </div>
        </div>
      </div>
      <ModalLetter />
    </div>
  )
}

export default index
