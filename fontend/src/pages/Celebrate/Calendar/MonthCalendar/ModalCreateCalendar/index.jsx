import { X } from 'lucide-react'
import { useState } from 'react'
import InforFormModal from './InforFormModal'
import PictureFormModal from './PictureFormModal'
import { createMemory } from '~/api/api'
import { toast } from 'react-toastify'

export default function ModalCreateCalendar({ setStatusModal, statusModal, setMemoryMonth }) {
  const [selectForm, setSelectForm] = useState('info')

  const [data, setData] = useState({
    date: statusModal,
    name: '',
    description: '',
    memoryType: '',
    image: ''
  })

  const handelSubmitCreate = () => {
    if (!data.name || !data.description) {
      return toast.error('Vui lòng nhập đầy đủ thông tin')
    }

    else if (data.memoryType == '1') {
      return toast.error('Vui lòng lựa chọn loại kỉ niệm')
    }

    // Kiểm tra nếu thiếu ảnh kỷ niệm
    else if (!data.image) {
      return toast.error('Vui lòng thêm ảnh kỷ niệm')
    }

    // Gọi API tạo kỷ niệm
    createMemory(data)
      .then(data => {
        // Nếu tạo thành công, thông báo thành công
        setStatusModal(false)
        setMemoryMonth(prev => ([...prev, data]))
        toast.success('Tạo kỷ niệm thành công')
      })
      .catch(() => {
        // Nếu có lỗi khi tạo, thông báo lỗi
        toast.error('Lỗi kỹ thuật, vui lòng thực hiện lại')
      })
  }


  return (
    <div className="fixed z-[999] inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.2)]">
      <div className="relative w-[90%] max-w-[450px] max-h-[80%] p-5 mb-5 bg-white rounded-xl border-2 overflow-y-auto">
        <X className="absolute top-3 right-3 text-pink-600" onClick={() => setStatusModal(false)} />
        <h2 className="text-center font-bold text-3xl text-pink-600">Lưu Giữ Kỷ Niệm</h2>
        <p className="text-center font-semibold text-xl text-pink-500">{statusModal}</p>

        <div className='w-full flex mt-3'>
          <button
            className={`flex-1 ${selectForm == 'info' ? 'bg-pink-500 text-white' : 'border border-pink-400 text-pink-500'}  py-2 font-semibold rounded-md mr-1`}
            onClick={() => {setSelectForm('info')}}
          >
            Thông tin
          </button>

          <button
            className={`flex-1 ${selectForm == 'picture' ? 'bg-pink-500 text-white' : 'border border-pink-400 text-pink-500'}  py-2 font-semibold rounded-md mr-1`}
            onClick={() => {setSelectForm('picture')}}
          >
            Hình ảnh
          </button>
        </div>

        {
          selectForm == 'info'?
            <InforFormModal
              data={data}
              setData={setData}
            /> :
            <PictureFormModal
              data={data}
              setData={setData}
            />
        }

        <div className="flex items-center mt-5 justify-end">
          <button
            className="px-4 py-2 text-pink-600 hover:bg-pink-100 hover:text-pink-800 font-semibold rounded-md mr-2 border border-pink-600"
            onClick={() => setStatusModal(false)}
          >
            Hủy
          </button>

          <button
            className="px-4 py-2 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-500"
            onClick={handelSubmitCreate}
          >
            Lưu kỉ niệm
          </button>
        </div>
      </div>
    </div>
  )
}
