import { BiImageAdd } from 'react-icons/bi'

function ImageUploader({ images, setImages }) {
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => URL.createObjectURL(file))
    setImages(prevImages => [...prevImages, ...newImages])
  }

  return (
    <div className="bg-pink-100 rounded-lg w-fit">
      <label className="block mb-4 text-pink-700 text-lg font-bold">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="cursor-pointer p-2 bg-pink-500 text-white rounded-lg flex items-center">
          <BiImageAdd className=" text-2xl mr-1" />
          Thêm ảnh
        </div>
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Upload Preview ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUploader
