export default function HeaderCooking() {
  return (
    <div className="hero bg-cover bg-center h-96 flex items-center justify-center relative bg-[url('/assets/cover_photo_cooking.svg')]">
      <div className="absolute inset-0 bg-pink-500 bg-opacity-50"></div>
      <div className="text-center text-white relative z-10">
        <h2 className="text-5xl font-bold mb-4 animate-fade-in-down">Hương vị của tình yêu</h2>
        <p className="text-2xl animate-fade-in-up">Khám phá và chia sẻ những công thức yêu thích của bạn</p>
      </div>
    </div>
  )
}
