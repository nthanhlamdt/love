import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar/index'
import Home from './pages/Home/page'
import Album from './pages/Album/page'
import Celebrate from './pages/Celebrate/page'
import Challenges from './pages/Challenges/page'
import Cooking from './pages/Cooking/page'
import Learning from './pages/Learning/page'
import TimeCapsule from './pages/TimeCapsule/page'
import VirtualGifts from './pages/VirtualGifts/page'
import PostPicture from './pages/PostPicture/page'
import Login from './pages/Auth/Login/page'
import Signup from './pages/Auth/Signup/page'
import { Toaster } from 'react-hot-toast'
// import { useAuthContext } from './context/authContext'
import { dataTest } from '../Data/DATATEST'
import PresentlyAlbum from './pages/Album/PresentlyAlbum'

function App() {
  const location = useLocation()
  // const { authUser } = useAuthContext()

  return (
    <div className='flex flex-col h-screen'>
      {/* Navbar luôn nằm ở trên cùng */}
      {location.pathname !== '/signup' && location.pathname !== '/login' && (
        <Navbar className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md" dataTest={dataTest} />
      )}
      {/* Nội dung phần dưới */}
      <div className='flex-1 overflow-auto'>
        <Routes>
          {/* <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/album' element={<Album />} />
          <Route path='/celebrate' element={<Celebrate />} />
          <Route path='/challenges' element={<Challenges />} />
          <Route path='/cooking' element={<Cooking />} />
          <Route path='/learning' element={<Learning />} />
          <Route path='/timeCapsule' element={<TimeCapsule />} />
          <Route path='/virtualGifts' element={<VirtualGifts />} />
          <Route path='/postPicture' element={<PostPicture />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/albums/presently_album/:id" element={<PresentlyAlbum />} />
          {/* <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} /> */}
        </Routes>
      </div>
      <Toaster
        className="z-[9999]"
        toastOptions={{
          className: 'z-[9999]', // Đặt z-index cao và thêm position
          style: {} // Có thể để trống hoặc tùy chỉnh
        }}
        containerClassName="z-[9999]" // Đảm bảo Toaster container cũng có z-index cao và vị trí cố định
      />

    </div>
  )
}

export default App
