const cook = require("../models/cookModel")
const ingredient = require("../models/ingredientCookModel")
const recipe = require("../models/recipeCookModel")
const couple = require("../models/coupleModel")
const step = require("../models/recipeCookModel")

const createCooking = async (req, res) => {
  try {
    const { name, description, title, peopleEating, time, ingredients, recipes } = req.body

    // Kiểm tra nếu các thông tin bắt buộc không tồn tại
    if (!name || !description || !title || !peopleEating || !time || !ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'Tài nguyên yêu cầu không tồn tại' })
    }

    // Phân tích chuỗi JSON thành mảng
    const ingredientsArray = Array.isArray(ingredients) ? ingredients : JSON.parse(ingredients)
    const recipesArray = Array.isArray(recipes) ? recipes : JSON.parse(recipes)

    const userId = req.user._id
    const imageUrl = req?.file?.path

    // Kiểm tra kết nối người dùng
    let userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    })

    if (!userStatusPending) return res.status(404).json({ error: 'Người dùng chưa kết nối!' })

    console.log(imageUrl)
    const newCook = new cook({
      coupleId: userStatusPending._id,
      description,
      name,
      title,
      peopleEating,
      time,
      image: imageUrl
    })

    const savedCook = await newCook.save()

    // Lưu nguyên liệu
    const arrayIngredient = await Promise.all(ingredientsArray.map(async (ird) => {
      if (!ird.name || !ird.amount || !ird.unit) {
        throw new Error('Thiếu thông tin bắt buộc!')
      }
      const newIngredient = new ingredient({
        cookId: savedCook._id,
        name: ird.name,
        amount: ird.amount,
        unit: ird.unit,
      })
      return await newIngredient.save()
    }))

    // Lưu công thức
    const arrayRecipes = await Promise.all(recipesArray.map(async (reci) => {
      if (!reci.description || !reci.step) {
        throw new Error('Thiếu thông tin bắt buộc!')
      }
      const newRecipe = new recipe({
        cookId: savedCook._id,
        description: reci.description,
        step: reci.step
      })
      return await newRecipe.save()
    }))

    return res.status(201).json({
      newCook: savedCook,
      arrayIngredient,
      arrayRecipes
    })
  } catch (error) {
    console.error("Error in createCooking controller:", error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

const getCooking = async (req, res) => {
  try {
    const userId = req.user._id

    if (!userId) return res.status(404).json({ error: 'Người dùng chưa kết nối!' })

    // Kiểm tra kết nối người dùng
    let userStatusPending = await couple.findOne({
      $or: [
        { userId: userId },
        { userLoveId: userId }
      ]
    })

    if (!userStatusPending) return res.status(404).json({ error: 'Người dùng chưa kết nối!' })

    const cookings = await cook.find({ coupleId: userStatusPending._id })
    return res.status(201).json(cookings)
  } catch (error) {
    console.error("Error in getCooking controller:", error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

const getIngredient = async (req, res) => {
  try {
    const { cookId } = req.query

    if (!cookId) return res.status(404).json({ error: 'cần có cookId' })
    
    const ingredients = await ingredient.find({ cookId })
    return res.status(201).json(ingredients)
  } catch (error) {
    console.error("Error in getCooking controller:", error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

const getStep = async (req, res) => {
  try {
    const { cookId } = req.query

    if (!cookId) return res.status(404).json({ error: 'cần có cookId' })
    
    const steps = await step.find({ cookId })
    return res.status(201).json(steps)
  } catch (error) {
    console.error("Error in getStep controller:", error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = {createCooking, getCooking, getIngredient, getStep}