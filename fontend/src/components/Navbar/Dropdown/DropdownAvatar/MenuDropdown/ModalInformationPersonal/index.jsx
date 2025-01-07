import { Camera, X, UserRoundPen, Save } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InformationUser from './InformationUser'
import ChangeInformationUser from './ChangeInformationUser'
import { useAuthContext } from '~/context/authContext'
import { formatDate } from '~/utils/formatDate'
import { toast } from 'react-toastify'
import { updateUser } from '~/api/api'
import Loading from '~/components/Loading'
import FormUpdateAvatar from './FormUpdateAvatar'

export default function ModalInformationPersonal({ setIsOpenInformationPerional }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isOpenUpdateAvatar, setIsOpenUpdateAvatar] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const [isLoading, setIsLoading] = useState(false)

  const { authUser, setAuthUser } = useAuthContext()
  const [data, setData] = useState({
    fullName: authUser.fullName,
    gender: authUser.gender,
    dateBirth: formatDate(authUser.dateBirth),
    phoneNumber: authUser.phoneNumber
  })

  const handleSave = () => {
    if (!data.fullName || !data.gender || !data.phoneNumber || !data.dateBirth) {
      return toast.error('Vui lòng nhập đầy đủ thông tin')
    }

    setIsLoading(true)
    updateUser({
      fullName: data.fullName,
      gender: data.gender,
      dateBirth: data.dateBirth,
      phoneNumber: data.phoneNumber
    })
      .then(data => {
        setAuthUser({ ...data, status: authUser.status })
        localStorage.setItem('user', JSON.stringify(data))
        toast.success('Cập nhật thông tin cá nhân thành công!')
        setIsEditing(false)
      })
      .catch(() => {
        toast.error('Lỗi cập nhật thông tin cá nhân vui lòng thử lại!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="fixed z-[10000] inset-0 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.4)]">
      {isLoading && <Loading />}
      <motion.div
        className="min-w-96 bg-white text-pink-600 rounded-lg overflow-hidden relative max-w-xl z-[10000]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <X
          className=' absolute right-3 top-3 text-white cursor-pointer'
          onClick={() => setIsOpenInformationPerional(false)}
        />
        <div
          className='bg-[url("https://tse3.mm.bing.net/th?id=OIP.XWrPy2IvhrdSuDOZ5mVBwQHaER&pid=Api&P=0&h=180")] bg-cover bg-center py-10'
          onClick={() => setIsOpenUpdateAvatar(true)}
        >
          <img src={user.avatar} alt="your avatar" className="w-28 h-28 object-cover object-center border-2 border-pink-100 z-10 rounded-full m-auto relative" />
          <Camera className='absolute bottom-0 right-0 text-white'/>
        </div>

        <div className='relative'>
          <motion.div
            className="absolute top-0 right-2 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {!isEditing ? (
              <button
                size={16}
                className="rounded-full p-2 bg-pink-400 bg-opacity-20 border-white hover:bg-pink-100 hover:text-pink-500 transition-colors"
                onClick={e => {
                  e.stopPropagation()
                  setIsEditing(true)
                }}
              >
                <UserRoundPen className="h-4 w-4" />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  size={16}
                  className="rounded-full p-2 bg-pink-400 bg-opacity-20 border-white hover:bg-pink-100 hover:text-pink-500 transition-colors"
                  onClick={e => {
                    e.stopPropagation()
                    setIsEditing(false)
                  }}
                >
                  <X className="h-4 w-4" />
                </button>

                <button
                  size={16}
                  className="rounded-full p-2 bg-pink-400 bg-opacity-20 border-white hover:bg-pink-100 hover:text-pink-500 transition-colors"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>

          {isOpenUpdateAvatar && <FormUpdateAvatar avatar={authUser.avatar} setIsOpenUpdateAvatar={setIsOpenUpdateAvatar} />}
          <AnimatePresence mode="wait">
            {
              !isEditing ? <InformationUser /> : <ChangeInformationUser setData={setData} data={data} />
            }
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
