import { useRef } from 'react'
import { Upload } from 'lucide-react'

export default function UploadFile({ setFileImages, setLoadingStates }) {
  const fileInputRef = useRef(null)

  const handleFileImageChange = (e) => {
    const files = Array.from(e.target.files)

    // Kiểm tra loại tệp và kích thước nếu cần
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/')
      const isValidSize = file.size <= 100 * 1024 * 1024 // Giới hạn kích thước file dưới 100MB

      return isValidType && isValidSize
    })

    // Tạo Object URL cho các tệp hợp lệ
    const newImages = validFiles.map(file => URL.createObjectURL(file))

    const arrayObjectFiles = validFiles.map((file, index) => {
      setLoadingStates(prev => [...prev, false])
      return {
        file: file,
        name: file.name, // Lấy tên file từ file.name
        time: new Date().toISOString(), // Thời gian tải lên
        location: '', // Bạn có thể gán địa điểm nếu cần
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
        onChange={handleFileImageChange}
        accept="image/*, video/*"
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
