import Footer from '../../../components/Footer'
import ModalInviteLove from './ModalInviteLove'

const NotConnectedHomepage = () => {
  const features = [
    {
      title: 'Kỷ Niệm Đặc Biệt',
      description: 'Đếm ngược cho các ngày kỷ niệm quan trọng và tạo video kỷ niệm từ ảnh và video.',
      icon: '💖'
    },
    {
      title: 'Thách Đố Ngẫu Nhiên',
      description: 'Thách đố hàng ngày/tháng và bảng xếp hạng để tạo tinh thần cạnh tranh.',
      icon: '🔥'
    },
    {
      title: 'Chia Sẻ Công Thức Nấu Ăn',
      description: 'Chia sẻ công thức nấu ăn và thử thách nấu ăn cùng nhau.',
      icon: '🍰'
    },
    {
      title: 'Chương Trình Học Tập Chung',
      description: 'Học ngôn ngữ mới và khám phá kiến thức với các khóa học ngắn.',
      icon: '🌟'
    },
    {
      title: 'Lá Thư Tương Lai',
      description: 'Viết thư gửi đến tương lai và gửi lời động viên cho các sự kiện đặc biệt.',
      icon: '🕊️'
    },
    {
      title: 'Hộp Thời Gian',
      description: 'Lưu trữ kỷ niệm và khám phá lại những ký ức vào ngày đặc biệt.',
      icon: '🗝️'
    },
    {
      title: 'Bản Đồ Kỷ Niệm',
      description: 'Tạo bản đồ ghi lại những nơi đặc biệt mà cả hai đã đến.',
      icon: '🌍'
    },
    {
      title: 'Quà Tặng Ảo',
      description: 'Tặng quà ảo như hoa, thiệp chúc mừng, hoặc biểu tượng đáng yêu.',
      icon: '🎀'
    },
    {
      title: 'Tạo Album Ảnh Kỷ Niệm',
      description: 'Tạo album ảnh cho những chuyến đi, sự kiện hoặc kỷ niệm.',
      icon: '📷'
    },
    {
      title: 'Sự Kiện Đặc Biệt',
      description: 'Lên kế hoạch cho các sự kiện đặc biệt như kỷ niệm, sinh nhật, hoặc ngày lễ.',
      icon: '🎆'
    },
    {
      title: 'Ghi Chép Chung',
      description: 'Ghi lại những suy nghĩ, ý tưởng hoặc kế hoạch chung.',
      icon: '🗒️'
    }
  ]

  const handleScroll = (e) => {
    e.preventDefault()
    const target = document.getElementById('khampha')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-gradient-to-r from-pink-50 to-pink-300 min-h-screen flex flex-col items-center">
      <header className="w-full bg-pink-600 text-white py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Khám Phá Tình Yêu</h1>
        <p className="text-lg mb-8">Khám phá các tính năng độc đáo và chuẩn bị cho hành trình tình yêu của bạn, dù bạn chưa kết nối với người yêu của mình.</p>
        <div className="flex flex-col md:flex-row md:justify-center gap-4">
          <button
            onClick={() => document.getElementById('modal_invite_love').showModal()}
            className="bg-white text-pink-600 py-3 px-5 mx-5 rounded-lg shadow-md hover:bg-pink-100 transition-transform transform hover:scale-105 text-lg font-semibold"
          >
            Mời Người Yêu
          </button>

          <a
            href="#khampha"
            onClick={handleScroll}
            className="bg-pink-700 text-white py-3 px-5 mx-5 rounded-lg shadow-md hover:bg-pink-800 transition-transform transform hover:scale-105 text-lg font-semibold smooth"
          >
            Khám Phá Ngay
          </a>
        </div>
      </header>

      <main id="khampha" className="w-full max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-pink-700">Tính Năng Đặc Biệt</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-pink-600 mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <ModalInviteLove />
    </div>
  )
}

export default NotConnectedHomepage
