import { Calendar, Phone, User } from 'lucide-react'
import { motion } from 'framer-motion'
import InputInfor from './InputInFor'
import Select from '~/components/Select'
import Label from '~/components/Label'

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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 px-10 py-5 md:p-5 relative mt-3'>
        <InputInfor Icon={User} lable={'Họ và tên'} value={data.fullName} onChange={(value) => handleChange('fullName', value)} type={'text'}/>
        <div>
          <Label title={'Giới tính'}/>
          <Select title={'Giới tính'} options={['Nam', 'Nữ']} onChange={(e) => handleChange('gender', e.target.value)} value={data.gender}/>
        </div>
        <InputInfor Icon={Calendar} lable={'Ngày sinh'} value={data.dateBirth} onChange={(value) => handleChange('dateBirth', value)} type={'date'}/>
        <InputInfor Icon={Phone} lable={'Số điện thoại'} value={data.phoneNumber} onChange={(value) => handleChange('phoneNumber', value)} type={'text'}/>
      </div>
    </motion.div>
  )
}
