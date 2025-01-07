import { X } from 'lucide-react'
import Label from '~/components/Label'
import TextArea from '~/components/TextArea'

export default function Steps({ newRecipe, setNewRecipe }) {
  const removeStep = (index) => {
    const updatedSteps = newRecipe.steps.filter((_, i) => i !== index)
    setNewRecipe({
      ...newRecipe, steps: updatedSteps.map((updateStep, index) => {
        return {
          description: updateStep.description,
          step: index + 1
        }}) })
  }

  const handleStepChange = (index, value) => {
    const updatedSteps = [...newRecipe.steps]
    updatedSteps[index].description = value
    updatedSteps[index].step = index + 1
    setNewRecipe({ ...newRecipe, steps: updatedSteps })
  }

  const addStep = () => {
    setNewRecipe({ ...newRecipe, steps: [...newRecipe.steps, { description: '', step: newRecipe.steps.length + 1 }] })
  }

  return (
    <div>
      <Label title={'Các Bước Thực Hiện*'}/>
      {newRecipe.steps.map((step, index) => (
        <div key={index} className="mt-2 gap-2 flex items-center">
          <TextArea type={'text'} value={step.description} title={`Bước ${index + 1}`} onChange={e => handleStepChange(index, e.target.value)} />

          <button
            type="button"
            onClick={() => removeStep(index)}
            className=" text-red-400 hover:text-red-500 focus:outline-none"
          >
            <X />
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
  )
}
