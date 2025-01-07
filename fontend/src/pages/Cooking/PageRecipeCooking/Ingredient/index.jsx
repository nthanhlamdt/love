import { useEffect, useState } from 'react'
import { getIngredient } from '~/api/api'

export default function CouplesRecipe({ cookId }) {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    getIngredient({ cookId })
      .then(data => setIngredients(data))
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error('Lỗi getIngredient: ', e)
      })
  })

  return (
    <div className='lg:px-32 my-10 w-full'>
      <h2 id='ingredient' className='text-5xl text-pink-700 font-bold py-8'>Thành phần</h2>
      <div className='overflow-x-auto w-full'>
        <table className='text-left w-full'>
          <thead>
            <tr className='border-b border-gray-300 w-full'>
              <th className='py-2 px-4 font-semibold text-center'>STT</th>
              <th className='py-2 px-4 font-semibold'>Nguyên liệu</th>
              <th className='py-2 px-4 font-semibold text-center'>Định lượng</th>
              <th className='py-2 px-4 font-semibold text-center'>Đơn vị</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.length > 0 && ingredients.map((ingredient, index) => (
              <tr key={ingredient._id} className='w-full border-b border-gray-200'>
                <td className='py-2 px-4 text-center w-1/4'>{index + 1}</td>
                <td className='py-2 px-4'>{ingredient.name}</td>
                <td className='py-2 px-4 text-center'>{ingredient.amount}</td>
                <td className='py-2 px-4 text-center'>{ingredient.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}