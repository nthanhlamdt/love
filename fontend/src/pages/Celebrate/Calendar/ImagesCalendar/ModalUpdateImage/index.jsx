import { Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { patchCelebrateImages } from '../../../../../api/api'

export default function ModalUpdateImage({ setIsModal, type, setImages, setTexts }) {
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  const userLove = JSON.parse(localStorage.getItem('userLove'))
  const [dataUpdate, setDataUpdate] = useState({
    type: type,
    file: '',
    text: '',
    userLoveId: userLove._id
  })

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file) => {
    setDataUpdate({ ...dataUpdate, file: file })
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (!dataUpdate.file || !dataUpdate.type || !dataUpdate.text || !dataUpdate.userLoveId) {
      toast.error('Vui lòng nhập đầy đủ thông tin để cập nhật')
    }
    else if (dataUpdate.text.length > 16) {
      toast.error('Thông tin ảnh vượt quá 16 kí tự')
    }
    else {
      patchCelebrateImages({
        file: dataUpdate.file,
        text: dataUpdate.text,
        userLoveId: dataUpdate.userLoveId,
        type: dataUpdate.type
      })
        .then((data) => {
          console.log(data)
          setImages([
            data.image1,
            data.image2,
            data.image3,
            data.image4
          ])

          setTexts([
            data.text1,
            data.text2,
            data.text3,
            data.text4
          ])
          toast.success('Cập nhật thành công')
          setIsModal(false)
        })
        .catch(() => {
          toast.error('Cập nhật thất bại')
        })
    }
  }

  return (
    <div className='fixed z-[999] top-0 inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center'>
      <div className='relative bg-white w-96 max-w-5/6 p-5 rounded-lg text-center'>
        <h2 className="text-3xl font-bold text-pink-600">THÔNG TIN ẢNH</h2>
        <span
          className='absolute top-5 right-5 text-pink-600 cursor-pointer'
          onClick={() => setIsModal(false)}
        >
          <X />
        </span>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-xl mt-5 text-pink-600">Hình ảnh</span>
          </div>
          <div
            className={`relative border-2 border-dashed rounded-lg p-4 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            } transition-colors duration-300 ease-in-out`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className='relative'>
                <img src={preview} alt='Preview' className='mx-auto max-h-64 rounded-lg' />
              </div>
            ) : (
              <>
                <Upload className='mx-auto h-12 w-12 text-gray-400' />
                <p className='mt-2 text-sm text-gray-600'>Drag and drop your image here, or click to select</p>
              </>
            )}
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileInput}
              accept='image/*'
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            />
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-xl mt-5 text-pink-600">Thông tin ảnh</span>
          </div>
          <input
            type="text"
            placeholder="Thông tin ảnh"
            className="input input-bordered w-full"
            value={dataUpdate.text}
            onChange={e => setDataUpdate({ ...dataUpdate, text: e.target.value })}
          />
        </label>

        <div className='flex items-center justify-end mt-4'>
          <button
            className='px-4 py-2 border border-pink-600 font-bold text-white bg-pink-600 rounded-md mr-2 hover:bg-pink-700'
            onClick={handleSubmit}
          >
            Lưu
          </button>

          <button
            onClick={() => setIsModal(false)}
            className='px-4 py-2 border border-pink-600 font-bold text-pink-600 hover:bg-pink-100 rounded-md'
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}
