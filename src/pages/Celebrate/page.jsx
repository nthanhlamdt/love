import Calendar from './Calendar'
import ModalCreateCelebrate from './Calendar/ListDayCalendar/ModalCreateCelebrate'

export default function Celebrate() {
  return (
    <div className="text-[#FF69B4] h-full container m-auto">
      <ModalCreateCelebrate />
      <main className="flex-1 px-6 py-8">
        <section>
          <div>
            <h2 className="text-2xl font-bold mb-4">Lịch kỉ niệm</h2>
            <div>
              <Calendar />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 mt-4">Kỉ Niệm Sắp Tới</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#FF69B4] w-8 h-8 flex items-center justify-center text-white">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Anniversary in 2 days</p>
                    <p className="text-sm text-[#FF69B4]">Đừng quên lên kế hoạch gì đó đặc biệt nhé!</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#FF69B4] w-8 h-8 flex items-center justify-center text-white">
                    <GiftIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Birthday in 1 week</p>
                    <p className="text-sm text-[#FF69B4]">Đã đến lúc bắt đầu nghĩ về một món quà!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function GiftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  )
}

// function HeartIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//     </svg>
//   )
// }
