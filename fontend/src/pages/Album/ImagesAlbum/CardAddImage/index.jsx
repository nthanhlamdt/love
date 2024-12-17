import { useState, useEffect } from 'react'
import FormAddImage from './FormAddImage'

export default function CardAddImage({
  image,
  setFileImages,
  index,
  albumId,
  selectedAddImages,
  setSelectedAddImages
}) {
  const currentDate = new Date()
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`

  // Thay đổi data thành một đối tượng thay vì mảng
  const [data, setData] = useState({ name: '', location: '', time: formattedDate, src: image.src, file: image.file })
  // Cập nhật lại fileImages khi data thay đổi

  useEffect(() => {
    setFileImages(prev => {
      return prev.map(image =>
        image.file === data.file ? { ...image, ...data } : image
      )
    })
  }, [data, setFileImages])

  const handleOnChangeCheckbox = (event) => {
    const isChecked = event.target.checked
    setSelectedAddImages((prev) => {
      if (isChecked) {
        return [...prev, index]
      } else {
        return prev.filter(id => id !== index)
      }
    })
  }

  return (
    <div className='relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform group'>
      <input
        type="checkbox"
        checked={selectedAddImages.includes(index)}
        onChange={handleOnChangeCheckbox}
        className={`absolute top-2 left-2 z-10 text-2xl w-4 h-4 ${selectedAddImages.length > 0 ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}
      />

      <div className='relative'>
        <img
          src={image.src}
          className='hero w-full h-64 object-cover object-center'
        />
      </div>

      <FormAddImage
        data={data}
        setData={setData}
        formattedDate={formattedDate}
        albumId={albumId}
        index={index}
        setFileImages={setFileImages}
      />
    </div>
  )
}
