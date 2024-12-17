import CardGiftBox from './CardGiftBox'
import HiddenGiftBox from './CardGiftBox/HiddenGiftBox'

export default function CardsGifBox({ selectedTypeGiftBox }) {
  const giftBoxs = [
    {
      'type': 'present',
      'name': 'Gấu Bông Xinh Xắn',
      'description': 'Một con gấu bông mềm mại, dễ thương, là món quà ngọt ngào dành tặng người yêu.',
      'image': 'https://tse2.mm.bing.net/th?id=OIP.S9cAWDOnjWecs9faezP9QwHaHN&pid=Api&P=0&h=180',
      'point': 50
    },
    {
      'type': 'present',
      'name': 'Hoa Hồng Tươi Thắm',
      'description': 'Chùm hoa hồng đỏ tươi, biểu tượng của tình yêu nồng nàn, dành cho những dịp đặc biệt.',
      'image': 'https://nhahoa.com.vn/wp-content/uploads/2021/06/Bo-Hoa-Hong-Do-Mix-Babi-Khong-Lo-HB029.jpg',
      'point': 40
    },
    {
      'type': 'present',
      'name': 'Trang Sức Bạc',
      'description': 'Nhẫn, vòng cổ hoặc bông tai bạc tinh tế, món quà hoàn hảo cho người bạn yêu.',
      'image': 'https://tse2.mm.bing.net/th?id=OIP.5FDDlTK06rtowgdGHjr6EgHaFV&pid=Api&P=0&h=180',
      'point': 100
    },
    {
      'type': 'present',
      'name': 'Chocolat Tình Yêu',
      'description': 'Hộp sô cô la ngọt ngào, món quà ngọt ngào dành tặng những khoảnh khắc lãng mạn.',
      'image': 'https://kilala.vn/data/upload/article/9698/honmei-choco.jpg',
      'point': 30
    },
    {
      'type': 'present',
      'name': 'Sách Yêu Thương',
      'description': 'Một cuốn sách về tình yêu, lý tưởng cho những người yêu thích đọc và khám phá cảm xúc.',
      'image': 'https://tse3.mm.bing.net/th?id=OIP.x-WKXyDQg61IbNItCvM4iAHaGI&pid=Api&P=0&h=180',
      'point': 60
    },
    {
      'type': 'experience',
      'name': 'Chuyến Du Lịch Lãng Mạn',
      'description': 'Trải nghiệm một chuyến du lịch đặc biệt cùng người yêu, tận hưởng không gian yên bình và lãng mạn.',
      'image': 'https://tse1.mm.bing.net/th?id=OIP.1guM95rtB_7HBnaREwbtpwHaE8&pid=Api&P=0&h=180',
      'point': 200
    },
    {
      'type': 'experience',
      'name': 'Bữa Tối Tại Nhà Hàng 5 Sao',
      'description': 'Bữa tối lãng mạn tại một nhà hàng 5 sao, không gian sang trọng, món ăn tinh tế.',
      'image': 'https://tse4.mm.bing.net/th?id=OIP.WzvlLloYd36k1LUYRhM8fwHaE7&pid=Api&P=0&h=180',
      'point': 150
    },
    {
      'type': 'experience',
      'name': 'Chuyến Dã Ngoại Kỳ Diệu',
      'description': 'Một chuyến đi dã ngoại ngoài trời với người yêu, thư giãn, vui vẻ và gần gũi với thiên nhiên.',
      'image': 'https://tse1.mm.bing.net/th?id=OIP.04I2YjfVxQ_UDLt3ZCso7QHaDt&pid=Api&P=0&h=180',
      'point': 120
    },
    {
      'type': 'experience',
      'name': 'Ngày Thư Giãn Tại Spa',
      'description': 'Trải nghiệm một ngày thư giãn tại spa, xóa tan mọi căng thẳng và tận hưởng sự thoải mái.',
      'image': 'https://tse3.mm.bing.net/th?id=OIP.h9s9_xsdHCFr7lirEsj0gAHaEP&pid=Api&P=0&h=180',
      'point': 100
    },
    {
      'type': 'service',
      'name': 'Dịch Vụ Chụp Ảnh Cặp Đôi',
      'description': 'Dịch vụ chụp ảnh chuyên nghiệp cho các cặp đôi, ghi lại những khoảnh khắc đẹp nhất bên nhau.',
      'image': 'https://tse1.mm.bing.net/th?id=OIP.0sBbyg1X_9lwZdX7xgNZXwHaJQ&pid=Api&P=0&h=180',
      'point': 90
    },
    {
      'type': 'service',
      'name': 'Dịch Vụ Thiết Kế Thẻ Tình Yêu',
      'description': 'Dịch vụ thiết kế thẻ tình yêu riêng biệt, mang đến những lời chúc ngọt ngào cho người bạn yêu.',
      'image': 'https://tse1.mm.bing.net/th?id=OIP.sgCvDiC0ulILvOV0MOmyewHaHa&pid=Api&P=0&h=180',
      'point': 60
    },
    {
      'type': 'service',
      'name': 'Dịch Vụ Làm Video Tình Cảm',
      'description': 'Dịch vụ tạo video tình cảm, ghi lại những khoảnh khắc đáng nhớ giữa bạn và người yêu.',
      'image': 'https://example.com/images/video_tinh_cam.jpg',
      'point': 150
    },
    {
      'type': 'service',
      'name': 'Dịch Vụ Thư Tình Thủ Công',
      'description': 'Dịch vụ viết thư tình thủ công, gửi gắm những tâm tư tình cảm một cách lãng mạn nhất.',
      'image': 'https://example.com/images/thu_tinh.jpg',
      'point': 70
    },
    {
      'type': 'service',
      'name': 'Dịch Vụ Lên Kế Hoạch Ngày Kỷ Niệm',
      'description': 'Dịch vụ tổ chức và lên kế hoạch cho một ngày kỷ niệm thật đặc biệt và lãng mạn.',
      'image': 'https://example.com/images/ke_hoach_ky_niem.jpg',
      'point': 120
    },
    {
      'type': 'hidden gift',
      'name': 'Hộp Quà Bí Mật',
      'description': 'Một hộp quà bí mật, chứa đựng những món quà nhỏ đầy bất ngờ và ý nghĩa.',
      'image': 'https://example.com/images/hop_qua_bi_mat.jpg',
      'point': 80
    },
    {
      'type': 'hidden gift',
      'name': 'Lá Thư Tình Ngọt Ngào',
      'description': 'Một lá thư tình tay viết, chứa đựng những lời nhắn nhủ ngọt ngào và chân thành.',
      'image': 'https://example.com/images/la_thu_tinh.jpg',
      'point': 40
    },
    {
      'type': 'hidden gift',
      'name': 'Món Quà Tự Làm',
      'description': 'Món quà tự tay làm, thể hiện sự chăm chút và tình cảm chân thành từ bạn.',
      'image': 'https://tse4.mm.bing.net/th?id=OIP.jJnHIR5GkDUKwAjpf6j0QgHaFj&pid=Api&P=0&h=180',
      'point': 60
    },
    {
      'type': 'hidden gift',
      'name': 'Nhật Ký Tình Yêu',
      'description': 'Một cuốn nhật ký ghi lại những kỷ niệm, cảm xúc và câu chuyện tình yêu của bạn.',
      'image': 'https://tse1.mm.bing.net/th?id=OIP.Mz-NjCrnywLc6gCvCjSpdAHaF0&pid=Api&P=0&h=180',
      'point': 50
    },
    {
      'type': 'hidden gift',
      'name': 'Bưu Thiếp Tình Yêu',
      'description': 'Một chiếc bưu thiếp tình yêu, thể hiện sự nhớ nhung và yêu thương sâu sắc.',
      'image': 'https://tse2.mm.bing.net/th?id=OIP.WwcD6fEtCWBGFoRHdKr0dQHaFj&pid=Api&P=0&h=180',
      'point': 30
    },
    {
      'type': 'voucher',
      'name': 'Voucher Quà Tặng Shop Tình Yêu',
      'description': 'Voucher trị giá 100k, dùng để mua sắm các sản phẩm trong shop Tình Yêu.',
      'image': 'https://tse2.mm.bing.net/th?id=OIP.WwcD6fEtCWBGFoRHdKr0dQHaFj&pid=Api&P=0&h=180',
      'point': 100
    },
    {
      'type': 'voucher',
      'name': 'Voucher Ăn Uống 2 Người',
      'description': 'Voucher ăn uống trị giá 300k, dành cho 2 người tại nhà hàng lãng mạn.',
      'image': 'https://tse4.mm.bing.net/th?id=OIP.GVdwpMpmLjm55HS3v3oN8wHaEq&pid=Api&P=0&h=180',
      'point': 150
    },
    {
      'type': 'voucher',
      'name': 'Voucher Thư Giãn Spa',
      'description': 'Voucher trị giá 500k, sử dụng cho các dịch vụ spa tại khu nghỉ dưỡng cao cấp.',
      'image': 'https://tse1.mm.bing.net/th?id=OIP.YvOf1xZFZfjX740Cu7HBpwHaFS&pid=Api&P=0&h=180',
      'point': 200
    },
    {
      'type': 'voucher',
      'name': 'Voucher Mua Sắm Quần Áo',
      'description': 'Voucher trị giá 200k, dùng để mua sắm quần áo thời trang tại các cửa hàng nổi tiếng.',
      'image': 'https://tse2.mm.bing.net/th?id=OIP.EXgYa-RKM94XqkQKpnWQVAHaGb&pid=Api&P=0&h=180',
      'point': 120
    },
    {
      'type': 'voucher',
      'name': 'Voucher Du Lịch 2 Người',
      'description': 'Voucher du lịch trị giá 1 triệu đồng, áp dụng cho chuyến đi 2 người đến các địa điểm du lịch nổi tiếng.',
      'image': 'https://tse4.mm.bing.net/th?id=OIP.6ZVBLywSH4CYBjcGSoBT5QHaEx&pid=Api&P=0&h=180',
      'point': 500
    }
  ]

  return (
    <div className='p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-2'>
      {giftBoxs.map((giftbox, key) => (
        (selectedTypeGiftBox === 'all' || giftbox.type === selectedTypeGiftBox) && (
          selectedTypeGiftBox !== 'hidden gift' ? <CardGiftBox key={key} giftbox={giftbox} /> :
            <HiddenGiftBox key={key} giftbox={giftbox} />
        )
      ))}
    </div>
  )
}
