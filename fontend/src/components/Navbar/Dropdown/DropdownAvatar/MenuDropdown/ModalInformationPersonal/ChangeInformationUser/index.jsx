import { Calendar, Phone, Sparkles, User } from 'lucide-react'
import { motion } from 'framer-motion'
import InputInfor from './InputInFor'
import { useAuthContext } from '~/context/authContext'
import { formatDate } from '~/utils/formatDate'

export default function ChangeInformationUser() {
  const { authUser } = useAuthContext()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className='grid grid-cols-2 gap-6 p-5 relative mt-3'>
        <InputInfor Icon={User} lable={'Họ và tên'} value={authUser.fullName}/>
        <InputInfor Icon={Sparkles} lable={'Giới tính'} value={authUser.gender}/>
        <InputInfor Icon={Calendar} lable={'Ngày sinh'} value={formatDate(authUser.dateBirth)}/>
        <InputInfor Icon={Phone} lable={'Số điện thoại'} value={authUser.phoneNumber} />
      </div>
    </motion.div>
  )
}
