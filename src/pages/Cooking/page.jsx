import { useState } from 'react'

export default function RecipeComponent() {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const openModal = (recipe) => {
    setSelectedRecipe(recipe)
  }

  const closeModal = () => {
    setSelectedRecipe(null)
  }

  const recipes = [
    {
      title: 'Xào Bò',
      author: 'John & Jane',
      rating: 4.8,
      reviews: 20,
      imageUrl: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
      ingredients: [
        { name: 'Thịt Bò', quantity: '450', unit: 'gram' },
        { name: 'Ớt Chuông', quantity: '2', unit: 'quả' },
        { name: 'Hành Tây', quantity: '1', unit: 'củ' },
        { name: 'Tỏi', quantity: '3', unit: 'tép' },
        { name: 'Nước Tương', quantity: '2', unit: 'muỗng canh' },
        { name: 'Giấm Gạo', quantity: '1', unit: 'muỗng canh' },
        { name: 'Dầu Mè', quantity: '1', unit: 'muỗng cà phê' },
        { name: 'Muối và Tiêu', quantity: 'vừa đủ', unit: '' }
      ],
      instructions: [
        'Làm nóng chảo hoặc wook trên lửa lớn.',
        'Thêm thịt bò vào xào khoảng 2-3 phút cho đến khi chín.',
        'Thêm ớt chuông, hành tây, và tỏi. Xào thêm 3-4 phút.',
        'Trong một bát nhỏ, khuấy đều nước tương, giấm gạo, và dầu mè.',
        'Đổ hỗn hợp nước sốt vào chảo và trộn đều. Nấu thêm 1-2 phút cho đến khi sốt đặc lại.',
        'Nêm muối và tiêu theo khẩu vị. Dùng ngay với cơm hoặc mì.'
      ]
    }
    // Thêm các công thức khác ở đây...
  ]

  return (
    <div className='grid w-full'>
      <main className='flex-1 px-4 py-6 md:px-6 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-6'>
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-bold text-pink-700'>Các Công Thức Nấu Ăn</h1>
              <button className='btn bg-pink-500 text-white'>Thêm Công Thức</button>
            </div>
            <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.title}
                  recipe={recipe}
                  openModal={openModal}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={closeModal} />}
    </div>
  )
}

function RecipeCard({ recipe, openModal }) {
  return (
    <div className='card bg-pink-100 shadow-xl'>
      <figure>
        <img
          src={recipe.imageUrl}
          alt='Hình Ảnh Công Thức'
          className='rounded-t-lg w-full h-48 object-cover'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title text-pink-700'>
          {recipe.title}
          <div className='badge badge-secondary bg-pink-500 text-white'>MỚI</div>
        </h2>
        <p className='text-pink-800'>{`Tạo bởi ${recipe.author}`}</p>
        <div className='card-actions justify-end'>
          <div className='badge badge-outline border-pink-500 text-pink-700'>Đánh Giá: {recipe.rating}</div>
          <button
            className='btn btn-sm bg-pink-500 text-white'
            onClick={() => openModal(recipe)}
          >
            Xem Chi Tiết
          </button>
        </div>
      </div>
    </div>
  )
}

function RecipeModal({ recipe, onClose }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-5/6 overflow-auto'>
        <button className='absolute top-4 right-4 text-pink-500' onClick={onClose}>
          Đóng
        </button>
        <div className='px-4 py-6 md:px-6 md:py-12 lg:py-16 bg-pink-100'>
          <article className='prose prose-pink max-w-4xl mx-auto dark:prose-invert'>
            <h1 className='text-4xl font-extrabold tracking-tight text-pink-700 lg:text-5xl'>
              {recipe.title}
            </h1>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className='aspect-[2/1] overflow-hidden rounded-lg object-cover mt-6'
            />
            <div className='mt-10'>
              <h2 className='text-2xl font-bold text-pink-700'>Nguyên Liệu</h2>
              <table className='min-w-full divide-y divide-gray-200 mt-4'>
                <thead className='bg-pink-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider'>
                      Nguyên Liệu
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider'>
                      Số Lượng
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider'>
                      Đơn Vị
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {recipe.ingredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td className='px-6 py-4 whitespace-nowrap'>{ingredient.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{ingredient.quantity}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{ingredient.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='mt-10'>
              <h2 className='text-2xl font-bold text-pink-700'>Cách Làm</h2>
              <ol className='list-decimal pl-4 mt-4 space-y-2'>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
