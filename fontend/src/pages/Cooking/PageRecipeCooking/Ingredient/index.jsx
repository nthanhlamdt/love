export default function CouplesRecipe() {
  const recipe = {
    name: 'Mì Ý Sốt Bò Bằm cho Hai Người',
    prepTime: '20 phút',
    cookTime: '30 phút',
    ingredients: [
      { name: 'Mì ống', amount: '200g' },
      { name: 'Thịt bò bằm', amount: '300g' },
      { name: 'Sốt cà chua', amount: '400g' },
      { name: 'Hành tây', amount: '1 củ' },
      { name: 'Tỏi', amount: '3 tép' },
      { name: 'Dầu ô liu', amount: '2 muỗng canh' },
      { name: 'Lá oregano khô', amount: '1 muỗng cà phê' },
      { name: 'Muối', amount: 'Theo khẩu vị' },
      { name: 'Tiêu', amount: 'Theo khẩu vị' }
    ],
    steps: [
      'Đun sôi nước trong nồi lớn, thêm muối và nấu mì theo hướng dẫn trên bao bì.',
      'Trong khi đó, phi thơm tỏi và hành tây băm nhuyễn trong chảo với dầu ô liu.',
      'Thêm thịt bò bằm vào chảo, nấu cho đến khi thịt chuyển màu nâu.',
      'Đổ sốt cà chua vào, thêm lá oregano, muối và tiêu. Đun nhỏ lửa trong 15 phút.',
      'Khi mì chín, vớt ra và trộn đều với sốt bò bằm.',
      'Bày lên đĩa và trang trí với lá basil tươi (nếu có). Thưởng thức cùng người thương!'
    ]
  }

  return (
    <div className='min-h-screen flex items-center text-lg md:text-2xl text-pink-600'>
      <div className='w-full md:flex md:justify-center'>
        <div className='p-8'>
          <h2 id='ingredient' className='text-5xl text-pink-700 font-bold py-8'>Thành phần</h2>
          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className='border-b border-gray-300'>
                  <th className='py-2 px-4 font-semibold '>STT</th>
                  <th className='py-2 px-4 font-semibold '>Nguyên liệu</th>
                  <th className='py-2 px-4 font-semibold '>Định lượng</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((ingredient, index) => (
                  <tr key={index} className='border-b border-gray-200 hover:bg-gray-50 transition duration-150'>
                    <td className='py-2 px-4'>{index + 1}</td>
                    <td className='py-2 px-4'>{ingredient.name}</td>
                    <td className='py-2 px-4'>{ingredient.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 id='cooking' className='text-5xl text-pink-700 font-bold py-8'>Cách làm</h2>
          <ol className='space-y-4'>
            {recipe.steps.map((step, index) => (
              <li key={index} className='flex items-start'>
                <span className='flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center mr-3 mt-1'>
                  {index + 1}
                </span>
                <p className='text-justify'>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}