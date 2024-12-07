import { Camera, X, UserRoundPen, Save } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InformationUser from './InformationUser'
import ChangeInformationUser from './ChangeInformationUser'

export default function ModalInformationPersonal({ setIsOpenInformationPerional }) {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className="z-[9999] fixed inset-0 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.4)]">
      <motion.div
        className="min-w-96 bg-white text-pink-600 rounded-lg overflow-hidden relative max-w-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <X
          className=' absolute right-3 top-3 text-white cursor-pointer'
          onClick={() => setIsOpenInformationPerional(false)}
        />
        <div className='bg-[url("https://tse3.mm.bing.net/th?id=OIP.XWrPy2IvhrdSuDOZ5mVBwQHaER&pid=Api&P=0&h=180")] bg-cover bg-center py-10'>
          <img src="/assets/imgtest.jpg" alt="your avatar" className="w-28 h-28 border-2 border-pink-100 z-10 rounded-full m-auto relative" />
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
                  // onClick={handleSave}
                >
                  <Save className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {
              !isEditing ? <InformationUser /> : <ChangeInformationUser />
            }
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
