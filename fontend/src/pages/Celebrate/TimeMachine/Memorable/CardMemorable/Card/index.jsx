import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'

export default function Card() {
  return (
    <>
      <Heart size={80} />
      <p className="text-2xl md:text-4xl font-semibold">05 tháng 03 năm 2021</p>
      <h1 className="text-6xl md:text-8xl font-lovelight my-3">Ngày bắt đầu hẹn hò</h1>
      <div className='flex justify-between items-center'>
        <button className='mr-5'><ChevronLeft size={50}/></button>
        <img
          src="assets/imgtest.jpg"
          alt=""
          className="w-52 h-52 md:w-80 md:h-80 object-cover object-center rounded-lg mb-2"
        />
        <button className='ml-5'><ChevronRight size={50}/></button>
      </div>
      <p className="text-xl md:text-2xl font-semibold">Bắt đầu hẹn hò cùng nhau</p>
    </>
  )
}
