import { Heart } from 'lucide-react'

export default function TypeChallegeHistory() {
  return (
    <div className="mb-3 flex flex-col w-full border border-pink-600 p-3 rounded-md bg-white shadow-sm shadow-pink-500 cursor-pointer">
      <div className="flex items-center justify-between text-[12px]">
        <span className="px-3 py-1 bg-pink-500 text-white rounded-xl">Thử thách</span>
        <span className="flex items-center text-pink-600"><Heart size={10}/>100</span>
      </div>

      <h2 className="text-pink-600 font-semibold text-sm">Buổi hẹn hò</h2>
      <p className="text-[10px] text-pink-600 text-justify">Tổ chức một buổi hẹn bất ngờ cho người yêu</p>

      {/* <img
        src="https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-1/428612755_411073891393500_5432439734118428374_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH2kWMeA4lLErOZdtScM6QlmtpI9eJbTh2a2kj14ltOHQqAQoPtzk0hq8EFeob4aIxLqL4Q5nTv0OD6FvGd5uoH&_nc_ohc=tha1KJi5BrkQ7kNvgFtWSXE&_nc_zt=24&_nc_ht=scontent.fdad1-1.fna&_nc_gid=ABVQyWojZAO7dbpSi4zrolc&oh=00_AYCYiZUmGl39ctSeKWJjpJlZXmIyp54QdP1gOovApNJzGg&oe=6759B2F6"
        className="w-full rounded-lg mt-2 m-auto"
      /> */}

      <span className='text-end text-xs text-pink-600'>29/12/2024</span>
    </div>
  )
}
