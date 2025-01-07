import { useState, useEffect } from 'react'
import FormAddImage from './FormAddImage'

export default function CardAddImage({
  image,
  setFileImages,
  index,
  selectedAddImages,
  setSelectedAddImages,
  isLoading
}) {
  console.log(isLoading)
  const currentDate = new Date()
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
  // Kiểm tra loại tệp (video hay ảnh) dựa trên MIME type
  const isVideo = () => {
    const file = image.file // Giả sử image.file là đối tượng File được tải lên từ trình duyệt
    if (file) {
      const mimeType = file.type // Kiểm tra kiểu MIME của tệp
      return mimeType.startsWith('video/') // Nếu là video
    }
    return false
  }

  // Initialize data state with image properties
  const [data, setData] = useState({
    name: '',
    location: '',
    time: formattedDate,
    src: image.src,
    file: image.file
  })

  // Update fileImages when data changes
  useEffect(() => {
    setFileImages(prev =>
      prev.map(img => img.file === data.file ? { ...img, ...data } : img)
    )
  }, [data, setFileImages])

  // Handle checkbox changes (selecting/deselecting images)
  const handleOnChangeCheckbox = (event) => {
    const isChecked = event.target.checked
    setSelectedAddImages(prev =>
      isChecked ? [...prev, index] : prev.filter(id => id !== index)
    )
  }

  return (
    <div className='relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform group'>
      {isLoading && <span className="loading loading-spinner loading-lg absolute top-2 right-2 z-10 text-pink-600"></span>}
      <input
        type="checkbox"
        checked={selectedAddImages.includes(index)}
        onChange={handleOnChangeCheckbox}
        className={`absolute top-2 left-2 z-10 text-2xl w-4 h-4 ${selectedAddImages.length > 0 ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}
      />

      <div className='relative'>
        {/* Render video if the source is a video */}
        {isVideo() ? (
          <video className='hero w-full h-64 object-cover object-center' controls>
            <source src={image.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Otherwise, render image
          <img
            src={image.src}
            className='hero w-full h-64 object-cover object-center'
            alt="Uploaded media"
          />
        )}
      </div>

      {/* Form to edit image details */}
      <FormAddImage
        data={data}
        setData={setData}
        formattedDate={formattedDate}
      />
    </div>
  )
}
