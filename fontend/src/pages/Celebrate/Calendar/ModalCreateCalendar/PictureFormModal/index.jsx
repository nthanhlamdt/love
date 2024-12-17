import { CalendarRange, Camera, Repeat, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

export default function PictureFormModal({ data, setData }) {
  const [checkBoxRepect, setCheckBoxRepect] = useState(false)
  const [image, setImage] = useState(null)
  const fileInputRef = useRef(null)

  const handelFileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const newImage = URL.createObjectURL(file)
      setImage(newImage)
      setData({ ...data, image: file })
    }
  }

  return (
    <div>
      <div className="flex flex-col mt-5">
        <label className="flex text-pink-600 mb-1">
          <Camera className="mr-1" />Hình ảnh kỉ niệm
        </label>
        {/* <input
          type="file"
          placeholder="Mô tả"
          className="border border-pink-500 rounded-lg p-2 outline-pink-800 text-pink-600 font-semibold"
        /> */}
        <div
          className='relative min-h-60 flex flex-col justify-center items-center overflow-hidden border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors hover:border-pink-500'
          onClick={() => fileInputRef.current.click()}
        >
          {image ? (
            <img
              src={image}
              // alt={`Preview ${index + 1}`}
              className="w-full max-h-80 object-cover object-center rounded-lg"
            />
          ) : (
            <div>
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Kéo và thả ảnh vào đây, hoặc click để chọn ảnh</p>
              <p className="text-xs text-gray-400 mt-1">(Tối đa 5 ảnh, mỗi ảnh không quá 5MB)</p>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handelFileImageChange}
            accept="image/*"
          />
        </div>
      </div>

      <div className="flex items-center mt-5 text-pink-600 font-semibold">
        <input
          type="checkbox"
          className="toggle toggle-error"
          checked={checkBoxRepect}
          onChange={() => {
            setCheckBoxRepect(!checkBoxRepect)
            setData({ ...data, repeat: !checkBoxRepect })
          }}
        />
        <Repeat className="inline-block w-4 h-4 mr-1 ml-2" />
        <span>Lặp lại hằng năm</span>
      </div>

      {checkBoxRepect &&
        <div className="flex flex-col mt-5">
          <label className="flex text-pink-600 mb-1">
            <CalendarRange className="mr-1" />Mong ước tương lai
          </label>

          <textarea
            rows={3}
            onChange={e => setData({ ...data, dreaming: e.target.value, repeat: true })}
            placeholder="Bạn có mong ước gì trong ngày kỉ niệm này năm sau (Điều này sẽ bị ẩn đi và sẽ thông báo lại trước 3 ngày vào năm sau)"
            className="border border-pink-500 rounded-lg p-2 outline-pink-800 text-pink-600 text-xs"
          />
        </div>}
    </div>
  )
}
