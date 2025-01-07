import { ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import FoodIntroduce from './FoodIntroduce'
import Ingredient from './Ingredient'
import { useEffect, useState } from 'react'
import { getCooking } from '~/api/api'
import Loading from '~/components/Loading'
import Step from './Step'

export default function PageRecipeCooking() {
  const [cookings, setCookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [cooking, setCooking] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    let isMounted = true

    setIsLoading(true)
    getCooking()
      .then(data => {
        if (isMounted) {
          setIsLoading(false)
          setCookings(data)
          const selectedCooking = data.find(cook => cook._id === id)
          setCooking(selectedCooking)
        }
      })
      .catch(e => {
        if (isMounted) {
          // eslint-disable-next-line no-console
          console.error('Error fetching cooking data: ', e)
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [id])

  // Conditional rendering while data is loading
  if (isLoading) return <Loading />

  return (
    <div className='scroll-smooth min-w-screen container mx-auto my-10 w-screen text-pink-600'>
      <Link className='flex text-pink-400' to='/cooking'>
        <ChevronLeft />
        <span>Quay lại</span>
      </Link>

      {cooking ? (
        <FoodIntroduce cooking={cooking} cookings={cookings} />
      ) : (
        <p>No cooking found for this recipe.</p>
      )}

      <Ingredient cookId={id} />
      <Step cookId={id} />

      <div className='mt-16 text-pink-600 text-2xl'>
        <h2 className=' font-bold lg:text-4xl text-5xl text-pink-700'>Thành quả</h2>

        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          <img
            className='w-full object-cover object-center rounded-lg'
            src='https://res.cloudinary.com/ddb9h61me/image/upload/v1730902933/love_image/dtsijo07yscccll32orb.jpg'
            alt='Dish result'
          />

          <img
            className='w-full object-cover object-center rounded-lg'
            src='https://res.cloudinary.com/ddb9h61me/image/upload/v1730902933/love_image/dtsijo07yscccll32orb.jpg'
            alt='Dish result'
          />

          <img
            className='w-full object-cover object-center rounded-lg'
            src='https://res.cloudinary.com/ddb9h61me/image/upload/v1730902933/love_image/dtsijo07yscccll32orb.jpg'
            alt='Dish result'
          />
        </div>
      </div>
    </div>
  )
}
