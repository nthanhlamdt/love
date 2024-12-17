import { useAuthContext } from '../../context/authContext'
import Heart from './Heart/index'
import NotConnectedHomepage from './HomeNotLove'
import { useEffect, useState, useRef } from 'react'
import { getCoupleUser } from '../../api/api'
import { useSocketContext } from '../../context/SocketContext'

function Home() {
  const { authUser, setAuthUser } = useAuthContext()
  const { socket } = useSocketContext()
  const [loveUser, setLoveUser] = useState(JSON.parse(localStorage.getItem('userLove')))
  const isAuthUserPending = useRef(false)

  useEffect(() => {
    if (!authUser || authUser.status !== 'pending' || isAuthUserPending.current) return

    getCoupleUser()
      .then((data) => {
        setLoveUser(data)
        setAuthUser({ ...authUser, status: 'pending' })
        localStorage.setItem('userLove', JSON.stringify(data))
        localStorage.setItem('user', JSON.stringify({ ...authUser, status: 'pending' }))
        isAuthUserPending.current = true // Đánh dấu rằng `authUser` đã được cập nhật sang `pending`
      })
  }, [authUser, setAuthUser])

  useEffect(() => {
    if (!socket) return

    const handleSetLoveUser = (user) => {
      setLoveUser(user)
      setAuthUser({ ...authUser, status: 'pending' })
      localStorage.setItem('userLove', JSON.stringify(user))
      localStorage.setItem('user', JSON.stringify({ ...authUser, status: 'pending' }))
      isAuthUserPending.current = true // Đánh dấu rằng `authUser` đã được cập nhật sang `pending`
    }

    socket.on('newCouple', handleSetLoveUser)

    return () => {
      socket.off('newCouple', handleSetLoveUser)
    }
  }, [socket])

  return (
    <div>
      {loveUser && authUser.status === 'pending' ? <Heart user={authUser} loveUser={loveUser} /> : <NotConnectedHomepage />}
    </div>
  )
}

export default Home
