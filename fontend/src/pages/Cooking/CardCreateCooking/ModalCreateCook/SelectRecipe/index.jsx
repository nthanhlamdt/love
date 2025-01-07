import InputImage from '~/components/InputImage'
import Ingredient from './Ingredient'
import Steps from './Steps'
import { useState } from 'react'
import Label from '~/components/Label'

export default function SelectRecipe({ newRecipe, setNewRecipe }) {
  const [picture, setPicture] = useState(null)
  const handelFileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const newImage = URL.createObjectURL(file)
      setPicture(newImage)
      setNewRecipe({ ...newRecipe, image: file })
    }
  }

  return (
    <>
      <div>
        <Label title={'Ảnh minh họa món ăn*'}/>
        <InputImage image={picture} onChange={handelFileImageChange}/>
      </div>

      <Ingredient newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
      <Steps newRecipe={newRecipe} setNewRecipe={setNewRecipe}/>
    </>
  )
}
