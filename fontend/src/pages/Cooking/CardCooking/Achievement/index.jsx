import { X } from 'lucide-react'
import { useState } from 'react'
import InputImage from '~/components/InputImage'

export default function Achievement({ setIsAchievement }) {
  const [image, setImage] = useState()

  const handelFileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const newImage = URL.createObjectURL(file)
      setImage(newImage)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-[rgba(0,0,0,0.3)]">
      <div className="relative overflow-auto max-w-[90%] w-[800px] bg-white rounded-lg p-4 max-h-[80%">
        <X
          className='absolute right-2 top-2 text-pink-600 cursor-pointer'
          onClick={() => setIsAchievement(false)}
        />

        <div className='mb-5'>
          <img
            src='https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/428612755_411073891393500_5432439734118428374_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeH2kWMeA4lLErOZdtScM6QlmtpI9eJbTh2a2kj14ltOHQqAQoPtzk0hq8EFeob4aIxLqL4Q5nTv0OD6FvGd5uoH&_nc_ohc=c8NbJTGUMTAQ7kNvgFkcX_Y&_nc_zt=24&_nc_ht=scontent.fdad3-4.fna&_nc_gid=AQverFOtr_iZiCc-HXt43_Y&oh=00_AYAwNxVLWHwuHcjymvZLjhG1SXsR3BWvWBZDPsN-iEUHtA&oe=67780576'
            className='rounded-md'
          />
        </div>

        <div className='w-1/2 mx-auto'>
          <InputImage image={image} onChange={handelFileImageChange} />
        </div>
      </div>
    </div>
  )
}
