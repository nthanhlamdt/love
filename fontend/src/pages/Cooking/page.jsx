import HeaderCooking from './HeaderCooking'
import CardCooking from './CardCooking'
import CardCreateCooking from './CardCreateCooking'
import { useEffect, useState } from 'react'
import { getCooking } from '~/api/api'
import Loading from '~/components/Loading'
import Achievement from './CardCooking/Achievement'

export default function EnhancedRecipeBook() {
  const [cookings, setCookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAchievement, setIsAchievement] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getCooking()
      .then(data => {
        setIsLoading(false)
        setCookings(data)
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error('Lỗi khi getCooking: ', e)
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 pb-10">
        <HeaderCooking />

        <main className='container mx-auto mt-5'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <CardCreateCooking />
            {cookings.map((cooking) => (
              <CardCooking key={cooking._id} cooking={cooking} setIsAchievement={setIsAchievement} />
            ))}
          </div>
        </main>
      </div>
      {isAchievement && <Achievement setIsAchievement={setIsAchievement} />}
    </>
  )
}