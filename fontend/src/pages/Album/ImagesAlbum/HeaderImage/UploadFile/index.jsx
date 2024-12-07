import { useRef } from 'react'
import { Upload } from 'lucide-react'

export default function UploadFile({ setFileImages }) {
  const fileInputRef = useRef(null)

  const handelFileImageChange = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => URL.createObjectURL(file))
    const arrayObjectFiles = files.map((file, index) => {
      return {
        file: file,
        name: '',
        time: '',
        location: '',
        src: newImages[index]
      }
    })
    setFileImages(prevImages => [...prevImages, ...arrayObjectFiles])
  }

  return (
    <div>
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handelFileImageChange}
        accept="image/*"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
      >
        <Upload className="mr-2" /> Thêm ảnh
      </button>
    </div>
  )
}
