import { useEffect, useState } from 'react'
import { getStep } from '~/api/api'

export default function Step({ cookId }) {
  const [steps, setSteps] = useState([])

  useEffect(() => {
    // Đảm bảo gọi API chỉ khi cookId thay đổi
    if (cookId) {
      getStep({ cookId })
        .then(data => setSteps(data))
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error('Lỗi getStep: ', e)
        })
    }
  }, [cookId])

  return (
    <div className='lg:px-32 my-10'>
      <h2 id='cooking' className='text-5xl text-pink-700 font-bold py-8'>Cách làm</h2>
      <ol className='space-y-4'>
        {steps.map((step, index) => (
          <li key={step._id} className='flex items-center'>
            <span className='flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center mr-3 mt-1'>
              {index + 1}
            </span>
            <p className='text-justify text-xl'>{step.description}</p> {/* Giả sử `step.description` là nội dung mô tả bước */}
          </li>
        ))}
      </ol>
    </div>
  )
}
