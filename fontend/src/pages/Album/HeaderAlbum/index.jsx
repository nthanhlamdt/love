export default function HeaderAlbum() {
  return (
    <div
      className="hero bg-cover bg-center h-96 flex items-center justify-center relative bg-[url('/assets/album.jpg')]"
    >
      <div className="absolute inset-0 bg-pink-500 bg-opacity-50"></div>
      <div className="text-center text-white relative p-1">
        <h2 className="text-5xl font-bold mb-4 animate-fade-in-down">Chuyện tình của chúng ta</h2>
        <p className="text-xl animate-fade-in-up">Ghi lại những khoảnh khắc khiến trái tim chúng ta cùng chung nhịp đập</p>
      </div>
    </div>
  )
}