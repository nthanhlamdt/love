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
      <InforUser Icon={User} label={'Họ và tên'} title={authUser.fullName}/>
      <InforUser Icon={Sparkles} label={'Giới tính'} title={authUser.gender}/>
      <InforUser Icon={Calendar} label={'Ngày sinh'} title={formatDate(authUser.dateBirth)}/>
      <InforUser Icon={Phone} label={'Số điện thoại'} title={authUser.phoneNumber}/>
      <InforUser Icon={Heart} label={'Tình trạng'} title={authUser.status == 'pending' ? 'Đang yêu' : 'Độc thân' }/>
    </motion.div>
  )
}
