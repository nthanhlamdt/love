import FoodThumbnailIndices from './FoodThumbnailIndices'
import InforFood from './InforFood'

export default function FoodIntroduce({ cooking, cookings }) {

  return (
    <div className='flex flex-col lg:flex-row justify-between items-center w-full mt-5'>
      <InforFood cooking={cooking} />

      <FoodThumbnailIndices cookings={cookings} />
    </div>
  )
}
