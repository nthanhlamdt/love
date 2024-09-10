import Heart from './Heart/index'
import NotConnectedHomepage from './HomeNotLove'
// import { useAuthContext } from '../../context/authContext'
import { dataTest } from '../../../Data/DATATEST'

function Home() {
  // const { authUser } = useAuthContext()

  if (dataTest === null) {
    return <div className='w-screen h-screen flex items-center justify-center'>
      <span className="loading loading-dots loading-lg"></span>
    </div> // Hiển thị khi dữ liệu đang được tải
  }

  return (
    <div>
      {dataTest?.users?.status === 'connected' ? <Heart user={dataTest.users} /> : <NotConnectedHomepage />}
    </div>
  )
}

export default Home
