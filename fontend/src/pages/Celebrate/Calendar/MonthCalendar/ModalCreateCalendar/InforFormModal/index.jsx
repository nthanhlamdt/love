import { CalendarRange, ClipboardType, Heart } from 'lucide-react'
import Emoji from '../../../../../../components/Emoji'
import { useEffect, useState } from 'react'
import { createMemoryType, getMemoryType } from '../../../../../../api/api'
import { toast } from 'react-toastify'

export default function InforFormModal({ data, setData }) {
  const [iconSelect, setIconSelect] = useState(false)
  const [memoryTypes, setMemoryTypes] = useState([])
  const [dataType, setDataType] = useState({
    icon: '',
    name: ''
  })

  const [typeCelebrate, setTypeCelebrate] = useState(data.memoryType)

  // Lấy dữ liệu từ API khi component được render lần đầu
  useEffect(() => {
    getMemoryType()
      .then((newData) => {
        if (newData && newData.length > 0) {
          setMemoryTypes([...newData, { icon: '❓', name: 'Khác', _id: '1' }])
          setData(prev => ({ ...prev, memoryType: data.memoryType? data.memoryType : newData[0]._id }))
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching memory types: ', error)
      })
  }, [data.memoryType, setData])

  const handleSaveNewMemoryType = () => {
    if (!dataType.name) {
      return toast.error('Vui lòng nhập tên kỉ niệm mới')
    }
    else if (!dataType.icon) {
      return toast.error('Vui lòng lựa chọn icon cho loại kỉ niệm mới')
    }
    else if (dataType.name.length >= 20) {
      return toast.error('Tên kỉ niệm mới quá dài(tối đa 20 kí tự)')
    }
    else {
      createMemoryType(dataType)
        .then(newDataType => {
          // Sao chép mảng hiện tại và loại bỏ phần tử cuối cùng
          const updatedMemoryTypes = [...memoryTypes]
          updatedMemoryTypes.pop()

          // Thêm phần tử mới (newDataType) và phần tử "Khác"
          updatedMemoryTypes.push(newDataType, { icon: '❓', name: 'Khác', _id: '1' })

          // Cập nhật lại memoryTypes và data
          setMemoryTypes(updatedMemoryTypes)
          setData(prev => ({ ...prev, memoryType: newDataType._id }))
          setTypeCelebrate(newDataType._id)
          setDataType({ icon: '', name: '' })
        })
        .catch(() => {
          toast.error('Lỗi kỹ thuật, vui lòng tạo lại')
        })
    }
  }

  return (
    <div>
      <div className="flex flex-col mt-5">
        <label className="flex text-pink-600 mb-1">
          <Heart className="mr-1" />Tiêu đề kỷ niệm*
        </label>
        <input
          type="text"
          value={data.name}
          placeholder="Tiêu đề kỉ niệm"
          onChange={e => setData({ ...data, name: e.target.value })}
          className="w-full p-3 text-pink-600 border border-pink-300 outline-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
      </div>

      <div className="flex flex-col mt-5">
        <label className="flex text-pink-600 mb-1">
          <CalendarRange className="mr-1" /> Mô tả*
        </label>
        <textarea
          rows={2}
          value={data.description}
          placeholder="Mô tả"
          onChange={e => setData({ ...data, description: e.target.value })}
          className="w-full p-3 text-pink-600 border border-pink-300 outline-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
      </div>

      <div className="flex flex-col mt-5">
        <label className="flex text-pink-600 mb-1">
          <ClipboardType className="mr-1" />
          Loại kỉ niệm*
        </label>
        <select
          className="w-full p-3 text-pink-600 border border-pink-300 outline-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          value={typeCelebrate} // Giá trị hiện tại của typeCelebrate
          onChange={e => {
            const selectedValue = e.target.value
            setTypeCelebrate(selectedValue) // Cập nhật typeCelebrate
            setData({ ...data, memoryType: selectedValue }) // Cập nhật memoryType trong data
          }}
        >
          {memoryTypes.map((memoryType) => (
            <option key={memoryType._id} value={memoryType._id}>
              {memoryType.icon + ' ' + memoryType.name}
            </option>
          ))}
        </select>
      </div>

      {typeCelebrate === '1' && (
        <div className="relative">
          {iconSelect && (
            <Emoji setDataType={setDataType} dataType={dataType} />
          )}

          <div className="relative mt-5">
            <p className="text-pink-600 font-semibold mr-1">Loại kỉ niệm: </p>

            <div className="flex items-center">
              <div className="w-full p-3 text-pink-600 border border-pink-300 outline-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 relative flex-1 flex items-center justify-between py-1 focus:border-2">
                <div>
                  <span className="px-1">{dataType.icon}</span>

                  <input
                    type="text"
                    placeholder="Tên loại kỷ niệm"
                    value={dataType.name}
                    onChange={e => setDataType({ ...dataType, name: e.target.value })}
                    className="py-1 outline-none text-pink-600 font-semibold"
                  />
                </div>
                <span
                  className="cursor-pointer mr-1 hover:bg-pink-100"
                  onClick={() => setIconSelect(!iconSelect)}
                >
                  😀
                </span>
              </div>

              <button
                onClick={handleSaveNewMemoryType}
                className="py-2 rounded-lg px-4 ml-2 bg-pink-600 text-white hover:bg-pink-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
