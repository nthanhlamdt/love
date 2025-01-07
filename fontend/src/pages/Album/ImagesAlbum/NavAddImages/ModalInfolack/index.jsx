import { Captions, MapPin } from 'lucide-react'
import { toast } from 'react-toastify'

export default function ModalInfolack({
  setCheck,
  defaultData,
  setDefaultData,
  fileImages,
  selectedAddImages,
  saveImages
}) {

  const handleSaveImages = async () => {
    if (!defaultData.name || !defaultData.location) {
      toast.error('Vui lòng nhập đầy đủ thông tin cho tên và vị trí ảnh.')
      return
    }

    const newArrayImages = selectedAddImages.map(select => fileImages[select])
    setCheck(false)
    saveImages(newArrayImages)
  }

  return (
    <div className="fixed z-[9999] bg-[rgba(0,0,0,0.4)] inset-0 flex justify-center items-center">
      <div className="border-2 border-pink-500 bg-white rounded-xl p-10 max-w-96">
        <h2 className='text-2xl font-bold'>Thông tin mặc định</h2>
        <p className='mb-5 text-sm text-pink-500'>Một vài ảnh chưa đủ thông tin vui lòng nhập thông tin mặc định để thay thế</p>
        <div className="flex flex-col">
          <div className='flex items-center'>
            <Captions />
            <input
              type="text"
              value={defaultData.name}
              onChange={e => setDefaultData({ ...defaultData, name: e.target.value })}
              className="border-2 ml-2 border-pink-500 outline-pink-600 rounded-lg placeholder-pink-500 text-pink-600 px-2 py-1 w-full"
              placeholder="Tiêu đề ảnh"
            />
          </div>
          <div className='flex items-center'>
            <MapPin />
            <input
              type="text"
              value={defaultData.location}
              onChange={e => setDefaultData({ ...defaultData, location: e.target.value })}
              className="border-2 ml-2 border-pink-500 outline-pink-600 rounded-lg placeholder-pink-500 text-pink-600 px-2 py-1 my-2 w-full"
              placeholder="Địa điểm"
            />
          </div>

          <div className='mt-5 flex justify-end space-x-2'>
            <button
              className='py-1 px-2 bg-pink-600 rounded-md text-white'
              onClick={handleSaveImages}
            >
              Lưu
            </button>

            <button
              className='px-2'
              onClick={() => setCheck(false)}
            >Hủy</button>
          </div>
        </div>
      </div>
    </div>
  )
}
