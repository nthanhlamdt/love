import MenuDropdown from './MenuDropdown'

export default function DropdownAvatar({
  avatarDropdownRef,
  setIsAvatarDropdownOpen,
  isAvatarDropdownOpen,
  setIsNotificationDropdownOpen,
  user
}) {
  return (
    <div ref={avatarDropdownRef} className='relative'>
      <div
        className="btn btn-ghost btn-circle avatar"
        onClick={() => {
          setIsAvatarDropdownOpen(!isAvatarDropdownOpen)
          setIsNotificationDropdownOpen(false)
        }}
      >
        <div className="w-10 rounded-full">
          <img alt="avatar" src={user?.avatar} />
        </div>
      </div>
      {isAvatarDropdownOpen && <MenuDropdown />}
    </div>
  )
}