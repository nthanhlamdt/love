import { X } from 'lucide-react'
import Input from '~/components/Input'
import Label from '~/components/Label'
import Select from '~/components/Select'

export default function Ingredient({ newRecipe, setNewRecipe }) {
  const quantitativeType = [
    'Kilogram', 'Gram', 'Lạng', 'Con', 'Lít', 'Ly', 'Chén', 'Bát', 'Muỗng canh', 'Muỗng cà phê', 'Quả', 'Lá', 'Củ', 'Miếng', 'Lát', 'Nhúm', 'Giọt', 'Thìa', 'Chén nhỏ', 'Muỗng canh nhỏ'
  ]

  const addIngredient = () => {
    setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, { name: '', amount: '', unit: '' }] })
  }

  const removeIngredient = (index) => {
    const updatedIngredients = newRecipe.ingredients.filter((_, i) => i !== index)
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients })
  }

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...newRecipe.ingredients]
    updatedIngredients[index][field] = value
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients })
  }

  return (
    <div>
      <Label title={'Nguyên liệu*'}/>
      {newRecipe.ingredients.map((ingredient, index) => (
        <div key={index} className="flex gap-2 mt-2 items-center w-full">
          <div className='flex-1'>
            <Input type={'text'} value={ingredient.name} title={'Tên nguyên liệu'} onChange={e => handleIngredientChange(index, 'name', e.target.value)} />
          </div>

          <div className='w-1/4'>
            <Input type={'number'} value={ingredient.amount} title={'Định lượng'} onChange={e => handleIngredientChange(index, 'amount', e.target.value)} />
          </div>

          <div className='w-[26%]'>
            <Select options={quantitativeType} title={'Đơn vị đo'} onChange={e => handleIngredientChange(index, 'unit', e.target.value)}/>
          </div>

          <button
            type="button"
            onClick={() => removeIngredient(index)}
            className=" text-red-400 hover:text-red-500 focus:outline-none"
          >
            <X />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addIngredient}
        className="mt-2 px-4 py-2 text-sm font-medium text-pink-600 bg-pink-100 rounded-md hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Thêm Nguyên Liệu
      </button>
    </div>
  )
}
