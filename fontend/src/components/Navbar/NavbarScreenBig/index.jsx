import { Link } from 'react-router-dom'

export default function NavbarScreenBig() {
  return (
    <div className="navbar-center hidden text-white lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li className="text-white"><Link to='/'>Trang Chủ</Link></li>
        <li className="text-white"><Link to='/album'>Album Ảnh</Link></li>
        <li className="text-white"><Link to='celebrate'>Kỷ Niệm</Link></li>
        <li className="text-white"><Link to='challenges'>Thử Thách</Link></li>
        <li className="text-white"><Link to='/cooking'>Nấu Ăn</Link></li>
        {/* <li className="text-white"><Link to='/learning'>Học Tập</Link></li>
        <li className="text-white"><Link to='/timeCapsule'>Hộp Thời Gian</Link></li> */}
        <li className="text-white"><Link to='/postPicture'>Đăng Ảnh</Link></li>
        {/* <li className="text-white"><Link to='/virtualGifts'>Quà Tặng</Link></li> */}
      </ul>
    </div>
  )
}
