export default function InforMessage() {
  const userLove = JSON.parse(localStorage.getItem('userLove'))
  const birthday = new Date(userLove.dateBirth)

  return (
    <div>
      <div className="p-2 z-[9999] flex items-center">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img src={userLove.avatar} />
          </div>
        </div>

        <div className="flex flex-col ml-2">
          <span className="text-xl font-semibold text-pink-700">{userLove.fullName}</span>
          <span className="text-sm text-pink-600">
            Sinh nhật:
            {birthday.getUTCDate() < 10 ? ' 0' + birthday.getUTCDate() : ' ' + birthday.getUTCDate()}/
            {birthday.getMonth() + 1 < 10 ? '0' + (birthday.getMonth() + 1) : (birthday.getDate() + 1)}/
            {birthday.getFullYear()}
          </span>
        </div>
      </div>
      <hr/>
    </div>
  )
}
