import { Calendar, Heart, Phone, Sparkles, User } from 'lucide-react'
import { motion } from 'framer-motion'
import InforUser from './InforUser'
import { useAuthContext } from '../../../../../../../context/authContext'
import { formatDate } from '../../../../../../../utils/formatDate'

export default function InformationUser() {
  const { authUser } = useAuthContext()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 p-5 relative mt-3'
    >
      <InforUser Icon={User} lable={'Họ và tên'} value={authUser.fullName}/>
      <InforUser Icon={Sparkles} lable={'Giới tính'} value={authUser.gender}/>
      <InforUser Icon={Calendar} lable={'Ngày sinh'} value={formatDate(authUser.dateBirth)}/>
      <InforUser Icon={Phone} lable={'Số điện thoại'} value={authUser.phoneNumber}/>
      <InforUser Icon={Heart} lable={'Tình trạng'} value={authUser.status == 'pending' ? 'Đang yêu' : 'Độc thân' }/>
    </motion.div>
  )
}
