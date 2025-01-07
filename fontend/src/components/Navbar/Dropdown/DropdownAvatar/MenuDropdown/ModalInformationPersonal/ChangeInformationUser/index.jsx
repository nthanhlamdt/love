import { Calendar, Phone, Sparkles, User } from 'lucide-react'
import { motion } from 'framer-motion'
import InputInfor from './InputInFor'

export default function ChangeInformationUser({ data, setData }) {

  const handleChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className='grid grid-cols-2 gap-6 p-5 relative mt-3'>
        <InputInfor Icon={User} lable={'Họ và tên'} value={data.fullName} onChange={(value) => handleChange('fullName', value)} />
        <InputInfor Icon={Sparkles} lable={'Giới tính'} value={data.gender} onChange={(value) => handleChange('gender', value)}/>
        <InputInfor Icon={Calendar} lable={'Ngày sinh'} value={data.dateBirth} onChange={(value) => handleChange('dateBirth', value)}/>
        <InputInfor Icon={Phone} lable={'Số điện thoại'} value={data.phoneNumber} onChange={(value) => handleChange('phoneNumber', value)}/>
      </div>
    </motion.div>
  )
}
