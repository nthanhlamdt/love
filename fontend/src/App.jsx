import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar/index'
import Home from './pages/Home/page'
import Album from './pages/Album/page'
import Celebrate from './pages/Celebrate/page'
import Challenges from './pages/Challenges/page'
import Cooking from './pages/Cooking/page'
import PostPicture from './pages/PostPicture/page'
import Login from './pages/Auth/Login/page'
import Signup from './pages/Auth/Signup/page'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthContext } from './context/authContext'
import ImagesAlbum from './pages/Album/ImagesAlbum'

import Footer from './components/Footer'
import ProtectedRoute from './routes/ProtectedRoute'
import Message from './components/Message'
import PageRecipeCooking from './pages/Cooking/PageRecipeCooking'

function App() {
  const location = useLocation()
  const { authUser } = useAuthContext()

  return (
    <div className='flex flex-col justify-between h-screen'>
      {/* Navbar luôn nằm ở trên cùng */}
      {location.pathname !== '/signup' && location.pathname !== '/login' && (
        <Navbar
          className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md"
          user={authUser} />
      )}

      {authUser?.status == 'pending' && <Message />}
      {/* Nội dung phần dưới */}
      <div className='flex-1 overflow-auto'>
        <Routes>
          <Route path='/' element={<ProtectedRoute element={<Home />} authUser={authUser} />} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/album' element={<ProtectedRoute element={<Album />} authUser={authUser} />} />
          <Route path='/celebrate' element={<ProtectedRoute element={<Celebrate />} authUser={authUser} />} />
          <Route path='/challenges' element={<ProtectedRoute element={<Challenges />} authUser={authUser} />} />
          <Route path='/cooking' element={<ProtectedRoute element={<Cooking />} authUser={authUser} />} />
          <Route path='/postPicture' element={<ProtectedRoute element={<PostPicture />} authUser={authUser} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/album/:id" element={<ProtectedRoute element={<ImagesAlbum />} authUser={authUser} />} />
          <Route path="/cooking/:id" element={<ProtectedRoute element={<PageRecipeCooking />} authUser={authUser} />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
