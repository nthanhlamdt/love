import HeaderCooking from './HeaderCooking'
import CardCooking from './CardCooking'
import CardCreateCooking from './CardCreateCooking'

const recipes = [
  {
    _id: 1,
    name: 'Phở bò',
    description: 'Món ăn truyền thống Việt Nam',
    ingredients: ['Bánh phở', 'Thịt bò', 'Hành', 'Gừng', 'Gia vị'],
    instructions: ['Nấu nước dùng', 'Trụng bánh phở', 'Thêm thịt bò và gia vị'],
    image: '/assets/imgtest.jpg',
    userImages: []
  },
  {
    _id: 2,
    name: 'Bún chả',
    description: 'Món ăn đặc trưng Hà Nội',
    ingredients: ['Bún', 'Thịt lợn', 'Nước mắm', 'Ớt', 'Tỏi'],
    instructions: ['Ướp thịt', 'Nướng thịt', 'Pha nước chấm', 'Bày bún và rau sống'],
    image: '/placeholder.svg?height=300&width=400',
    userImages: []
  },
  {
    _id: 3,
    name: 'Bún chả',
    description: 'Món ăn đặc trưng Hà Nội',
    ingredients: ['Bún', 'Thịt lợn', 'Nước mắm', 'Ớt', 'Tỏi'],
    instructions: ['Ướp thịt', 'Nướng thịt', 'Pha nước chấm', 'Bày bún và rau sống'],
    image: '/placeholder.svg?height=300&width=400',
    userImages: []
  },
  {
    _id: 4,
    name: 'Bún chả',
    description: 'Món ăn đặc trưng Hà Nội',
    ingredients: ['Bún', 'Thịt lợn', 'Nước mắm', 'Ớt', 'Tỏi'],
    instructions: ['Ướp thịt', 'Nướng thịt', 'Pha nước chấm', 'Bày bún và rau sống'],
    image: '/placeholder.svg?height=300&width=400',
    userImages: []
  },
  {
    _id: 5,
    name: 'Bún chả',
    description: 'Món ăn đặc trưng Hà Nội',
    ingredients: ['Bún', 'Thịt lợn', 'Nước mắm', 'Ớt', 'Tỏi'],
    instructions: ['Ướp thịt', 'Nướng thịt', 'Pha nước chấm', 'Bày bún và rau sống'],
    image: '/placeholder.svg?height=300&width=400',
    userImages: []
  },
  {
    _id: 6,
    name: 'Bún chả',
    description: 'Món ăn đặc trưng Hà Nội',
    ingredients: ['Bún', 'Thịt lợn', 'Nước mắm', 'Ớt', 'Tỏi'],
    instructions: ['Ướp thịt', 'Nướng thịt', 'Pha nước chấm', 'Bày bún và rau sống'],
    image: '/placeholder.svg?height=300&width=400',
    userImages: []
  },
  {
    _id: 7,
    name: 'Bún chả',
    description: 'Món ăn đặc trưng Hà Nội',
    ingredients: ['Bún', 'Thịt lợn', 'Nước mắm', 'Ớt', 'Tỏi'],
    instructions: ['Ướp thịt', 'Nướng thịt', 'Pha nước chấm', 'Bày bún và rau sống'],
    image: '/placeholder.svg?height=300&width=400',
    userImages: []
  },
  {
    _id: 8,
    name: 'Bún chả',
    description: 'Món ăn đặc trưng Hà Nội',
    ingredients: ['Bún', 'Thịt lợn', 'Nước mắm', 'Ớt', 'Tỏi'],
    instructions: ['Ướp thịt', 'Nướng thịt', 'Pha nước chấm', 'Bày bún và rau sống'],
    image: '/placeholder.svg?height=300&width=400',
    userImages: []
  }
]

export default function EnhancedRecipeBook() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 pb-10">
      <HeaderCooking />

      <main className='container mx-auto mt-5'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <CardCreateCooking />
          {recipes.map((recipe) => (
            <CardCooking key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  )
}