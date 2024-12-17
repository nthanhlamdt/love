import { ImageIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CardCooking({ recipe }) {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer transform hover:-rotate-1">
      <div className="relative">
        <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <span
            className="text-white text-lg font-semibold"
            onClick={() => navigate(`/cooking/${recipe._id}`)}
          >
            Xem công thức
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-pink-600 mb-2">{recipe.name}</h2>
        <p className="text-gray-600">{recipe.description}</p>
        <div className="flex items-center justify-between mt-4">
          <button
            className="text-sm text-pink-500 font-medium hover:text-pink-700 transition-colors"
            onClick={() => navigate(`/cooking/${recipe._id}`)}
          >
            Khám phá ngay
          </button>
          <button className="text-pink-500 hover:text-pink-700 transition-colors">
            <ImageIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
