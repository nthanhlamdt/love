export default function Event({ notification }) {
  return (
    <div className='max-w-96 mx-auto border p-4 flex flex-col items-center text-pink-600 border-pink-300 rounded-lg overflow-hidden shadow-lg bg-white'>
      <img
        src={notification.senderId.avatar}
        alt={notification.senderId.fullName}
        className="rounded-full w-40 h-40 mx-auto"
      />
      <span className="font-bold text-xl text-center content-center mx-auto">{notification.senderId.fullName + ' '}</span>
      {notification.title}
    </div>
  )
}