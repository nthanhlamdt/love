import { Upload } from 'lucide-react'
import { useRef } from 'react'

export default function InputImage({ image, onChange }) {
  const fileInputRef = useRef(null)

  return (
    <div className="flex flex-col">
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
          onChange={onChange}
          accept="image/*"
        />
      </div>
    </div>
  )
}
