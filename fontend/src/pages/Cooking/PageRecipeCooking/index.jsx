import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import FoodIntroduce from './FoodIntroduce'
import Ingredient from './Ingredient'

export default function PageRecipeCooking() {


  return (
    <div className='scroll-smooth min-w-screen container mx-auto my-10 w-screen text-pink-600'>
      <Link className='flex text-pink-400' to='/cooking'>
        <ChevronLeft />
        <span>Quay lại</span>
      </Link>

      <FoodIntroduce />

      <Ingredient />

      <div className='mt-16 text-pink-600 text-2xl'>
        <h2 className=' font-bold lg:text-4xl text-5xl text-pink-700'>Thành quả</h2>

        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          <img
            className='w-full object-cover object-center rounded-lg'
            src='https://res.cloudinary.com/ddb9h61me/image/upload/v1730902933/love_image/dtsijo07yscccll32orb.jpg'
          />

          <img
            className='w-full object-cover object-center rounded-lg'
            src='https://res.cloudinary.com/ddb9h61me/image/upload/v1730902933/love_image/dtsijo07yscccll32orb.jpg'
          />

          <img
            className='w-full object-cover object-center rounded-lg'
            src='https://res.cloudinary.com/ddb9h61me/image/upload/v1730902933/love_image/dtsijo07yscccll32orb.jpg'
          />
        </div>
      </div>
    </div>
  )
}