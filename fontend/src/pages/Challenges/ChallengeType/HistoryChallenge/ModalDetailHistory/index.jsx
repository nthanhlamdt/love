import { X } from 'lucide-react'

export default function ModalDetailHistory({ setIsModalDetil }) {
  return (
    <div
      className="fixed z-[999] inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center transition-opacity duration-300"
      onClick={() => setIsModalDetil(false)} // Đóng modal khi click vào nền ngoài
    >
      <div
        className="relative w-5/6 max-w-96 bg-white p-5 rounded-lg transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click từ lan ra ngoài
      >
        <span
          className="absolute right-5 top-5 cursor-pointer"
          onClick={() => setIsModalDetil(false)} // Đóng modal khi nhấn vào nút X
        >
          <X className="text-pink-600" />
        </span>
        {/* Nội dung của modal */}
        <div>
          <h2 className="text-pink-600 text-lg font-semibold mb-2">Chi tiết thử thách</h2>
          <p className="text-pink-500 text-sm">Thông tin chi tiết về thử thách sẽ được hiển thị ở đây.</p>
        </div>
      </div>
    </div>
  )
}
