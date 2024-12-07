export default function ImagesCalendar() {
  return (
    <div className="space-y-4 mr-2">
      <div className="grid grid-cols-2 gap-10">
        <div className="text-center min-w-40 h-56 border-8 bg-[rgba(255,255,255,0.6)] border-white shadow-xl shadow-pink-600 rounded-sm transform -rotate-[10deg] translate-x-3 translate-y-4">
          <img
            src='/assets/celebrate_image_1.png'
            alt="Couple photo 1"
            className="object-cover object-center h-44 w-full" />
          <span className="py-3 text-pink-500 font-lovelight text-2xl font-semibold">Yêu là hạnh phúc</span>
        </div>

        <div className="text-center min-w-40 h-56 border-8 bg-[rgba(255,255,255,0.6)] border-white shadow-xl shadow-pink-600 rounded-sm transform rotate-6 translate-y-1 -translate-x-3">
          <img
            src='/assets/celebrate_image_2.png'
            alt="Couple photo 2"
            className="object-cover object-center h-44 w-full" />
          <span className="py-3 text-pink-500 font-lovelight text-2xl font-semibold">Tình yêu cần vun đắp</span>
        </div>

        <div className="text-center min-w-40 h-56 border-8 bg-[rgba(255,255,255,0.6)] border-white shadow-xl shadow-pink-600 rounded-sm transform rotate-3 translate-x-4 -translate-y-7">
          <img
            src='/assets/celebrate_image_3.png'
            alt="Couple photo 3"
            className="object-cover object-center h-44 w-full" />
          <span className="py-3 text-pink-500 font-lovelight text-2xl font-semibold">I love you</span>
        </div>

        <div className="text-center min-w-40 h-56 border-8 bg-[rgba(255,255,255,0.6)] border-white shadow-xl shadow-pink-600 rounded-sm transform -rotate-[8deg] -translate-x-4 -translate-y-5">
          <img
            src='/assets/celebrate_image_4.png'
            alt="Couple photo 4"
            className="object-cover object-center h-44 w-full" />
          <span className="py-3 text-pink-500 font-lovelight text-2xl font-semibold">Yêu nhau là đủ</span>
        </div>
        {/* <img
          src='/assets/celebrate_image_2.png'
          alt="Couple photo 2"
          className="h-56 w-full object-cover border-8 border-white shadow-xl shadow-pink-600 rounded-sm transform rotate-6 translate-y-1" />
        <img
          src='/assets/celebrate_image_3.png'
          alt="Couple photo 3"
          className="h-60 w-full object-cover border-8 border-white shadow-xl shadow-pink-600 rounded-sm transform rotate-3 translate-x-3 " />
        <div className="text-center w-full border-8 border-white shadow-xl shadow-pink-600 rounded-sm transform -rotate-[10deg] -translate-y-7">
          <img
            src='/assets/celebrate_image_1.png'
            alt="Couple photo 4"
            className="h-60 w-full object-cover" />
          <div className="text-pink-500 font-lovelight text-xl font-semibold">Anh yêu em</div>
        </div> */}
      </div>
    </div>

  )
}
