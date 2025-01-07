import { motion } from 'framer-motion'
import { ChefHat, Clock, ConciergeBell, CookingPot } from 'lucide-react'

export default function InforFood({ cooking }) {
  const handleScroll = (e, value) => {
    e.preventDefault()
    const section = document.getElementById(value)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className='w-full mr-10 lg:w-[40%]'>
      <motion.h2
        className='font-bold lg:text-4xl text-5xl text-pink-700'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {cooking.name}
      </motion.h2>

      <motion.p
        className='text-justify my-5 lg:text-md xl:text-lg'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {cooking.description}
      </motion.p>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex items-center'>
          <Clock className='mr-2'/>
          {cooking.time} phút
        </div>
        <div className='flex items-center ml-3'>
          <ConciergeBell className='mr-2'/>
          {cooking.peopleEating} người ăn
        </div>
      </motion.div>

      <div className='mt-5 flex items-center'>
        <button className='lg:text-sm w-[50%] mr-3 bg-pink-600 rounded-full font-semibold text-white hover:bg-pink-700'>
          <a href='#ingredient' className='flex py-3 items-center justify-center' onClick={(e) => handleScroll(e, 'ingredient')} aria-label="Scroll to ingredients">
            <CookingPot className='mr-2 ' />Thành phần
          </a>
        </button>

        <button className='lg:text-sm w-[50%] rounded-full text-pink-600 font-semibold border border-pink-600 hover:bg-pink-100'>
          <a href='#cooking' className='flex py-3 items-center justify-center' onClick={(e) => handleScroll(e, 'cooking')} aria-label="Scroll to cooking method">
            <ChefHat className='mr-2' />Cách nấu
          </a>
        </button>
      </div>
    </div>
  )
}
