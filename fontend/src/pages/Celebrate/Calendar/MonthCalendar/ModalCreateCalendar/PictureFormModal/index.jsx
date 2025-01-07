import { Camera } from 'lucide-react'
import { useState } from 'react'
import InputImage from '~/components/InputImage'
import Label from '~/components/Label'

export default function PictureFormModal({ data, setData }) {
  const [image, setImage] = useState(null)

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
      <Label title={<><Camera className="mr-1" />Hình ảnh kỉ niệm</>}/>
      <InputImage image={image} onChange={handelFileImageChange}/>
    </div>
  )
}
