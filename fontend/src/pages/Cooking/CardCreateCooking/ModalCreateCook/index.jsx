import { X } from 'lucide-react'
import { useState } from 'react'

export default function ModalCreateCook({ setIsOpenModalCreate }) {
  const [recipes, setRecipes] = useState([])
  const [newRecipe, setNewRecipe] = useState({
    id: 0,
    name: '',
    description: '',
    ingredients: [{ name: '', amount: '' }],
    steps: [{ description: '' }],
    image: null
  })

  const handleInputChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value })
  }

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...newRecipe.ingredients]
    updatedIngredients[index][field] = value
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients })
  }

  const handleStepChange = (index, value) => {
    const updatedSteps = [...newRecipe.steps]
    updatedSteps[index].description = value
    setNewRecipe({ ...newRecipe, steps: updatedSteps })
  }

  const addIngredient = () => {
    setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, { name: '', amount: '' }] })
  }

  const addStep = () => {
    setNewRecipe({ ...newRecipe, steps: [...newRecipe.steps, { description: '' }] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setRecipes([...recipes, { ...newRecipe, id: Date.now() }])
    setNewRecipe({
      id: 0,
      name: '',
      description: '',
      ingredients: [{ name: '', amount: '' }],
      steps: [{ description: '' }],
      image: null
    })
  }

  const removeIngredient = (index) => {
    const updatedIngredients = newRecipe.ingredients.filter((_, i) => i !== index)
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients })
  }

  const removeStep = (index) => {
    const updatedSteps = newRecipe.steps.filter((_, i) => i !== index)
    setNewRecipe({ ...newRecipe, steps: updatedSteps })
  }

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[999] flex items-center justify-center">
      <div className="max-h-[80%] w-4/6 max-w-[500px] bg-white rounded-xl px-5 relative text-pink-600 overflow-auto">
        <X
          className='absolute right-5 top-5 cursor-pointer'
          onClick={() => setIsOpenModalCreate(false)}
        />

        <form onSubmit={handleSubmit} className="space-y-4 py-10">
          <h2 className="text-center font-bold text-2xl mb-5">CÔNG THỨC NẤU ĂN TÌNH YÊU</h2>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Tên Món Ăn</label>
            <input
              type="text"
              value={newRecipe.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <input
              type="text"
              value={newRecipe.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Mô Tả</label>
            <textarea
              value={newRecipe.description}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nguyên Liệu</label>
            {newRecipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Tên nguyên liệu"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                />

                <input
                  type="text"
                  placeholder="Số lượng"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                />

                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Các Bước Thực Hiện</label>
            {newRecipe.steps.map((step, index) => (
              <div key={index} className="mt-2 flex items-center">
                <textarea
                  placeholder={`Bước ${index + 1}`}
                  value={step.description}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                  rows={2}
                />

                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="mt-2 px-4 py-2 text-sm font-medium text-pink-600 bg-pink-100 rounded-md hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Thêm Bước
            </button>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v1h2a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm4 1h2v1H9V4zm0 3a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            Lưu Công Thức
          </button>
        </form>

      </div>
    </div>
  )
}
