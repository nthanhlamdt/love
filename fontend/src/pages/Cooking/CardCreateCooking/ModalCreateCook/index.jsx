import { useState } from 'react'
import { X } from 'lucide-react'
import ButtonSaveCook from './ButtonSaveCook'
import SelectInfo from './SelectInfo'
import SelectRecipe from './SelectRecipe'
import { createCooking } from '~/api/api'
import { toast } from 'react-toastify'
import Loading from '~/components/Loading'

export default function ModalCreateCook({ setIsOpenModalCreate }) {
  const [selectForm, setSelectForm] = useState('infor')
  const [isLoading, setIsLoading] = useState(false)
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    title: '',
    ingredients: [{ name: '', amount: '', unit: 'Kilogram' }],
    steps: [{ step: '', description: '' }],
    image: null,
    peopleEating: 0,
    time: 0
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    createCooking(newRecipe)
      .then(() => {
        toast.success('Công thức nấu ăn mới đã được thêm thành công')
        setNewRecipe({
          name: '',
          description: '',
          title: '',
          ingredients: [{ name: '', amount: '', unit: 'Kilogram' }],
          steps: [{ step: '', description: '' }],
          image: null,
          peopleEating: 0,
          time: 0
        })
      })
      .catch(() => {
        toast.error('Đã có lỗi sảy ra vui lòng thử lại')

      })
      .finally(() => {
        setIsLoading(false)
        setIsOpenModalCreate(false)
      })
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[999] flex items-center justify-center">
        <div className="max-h-[85%] w-[80%] max-w-[500px] bg-white rounded-xl px-5 relative text-pink-600 overflow-auto">

          <X
            className='absolute top-5 right-5 z-10 cursor-pointer'
            onClick={() => setIsOpenModalCreate(false)} // Đóng modal
          />

          <form onSubmit={handleSubmit} className="pb-10 relative">
            <h2 className="text-center font-bold text-2xl py-10">CÔNG THỨC NẤU ĂN TÌNH YÊU</h2>

            <div className='w-full flex items-center gap-2 mb-5'>
              <button
                className='w-full py-2 border border-pink-500 rounded-md hover:bg-pink-600 hover:text-white'
                onClick={() => setSelectForm('infor')}
              >
                Thông tin
              </button>

              <button
                className='w-full py-2 border border-pink-500 rounded-md hover:bg-pink-600 hover:text-white'
                onClick={() => setSelectForm('recipe')}
              >
                Công thức
              </button>
            </div>


            {selectForm == 'infor' ? <SelectInfo
              newRecipe={newRecipe}
              setNewRecipe={setNewRecipe}
            /> : <SelectRecipe
              newRecipe={newRecipe}
              setNewRecipe={setNewRecipe}
            />}

            <ButtonSaveCook />
          </form>

        </div>
      </div>
    </>
  )
}
