import { useEffect, useRef, useState } from 'react'
import DropdownAvatar from './DropdownAvatar'
import DropdownNotification from './DropdownNoti'

export default function Dropdown({ user }) {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false)
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)

  const notificationDropdownRef = useRef(null)
  const avatarDropdownRef = useRef(null)

  const handleClickOutside = (e) => {
    if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(e.target)) {
      setIsNotificationDropdownOpen(false)
    }
    if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(e.target)) {
      setIsAvatarDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div>
      <div className="w-36 flex items-center dropdown dropdown-end nav-end mr-2 xl:mr-10">
        <div className="w-36 flex items-center mx-10 dropdown dropdown-end justify-end">
          <DropdownNotification
            notificationDropdownRef={notificationDropdownRef}
            setIsAvatarDropdownOpen={setIsAvatarDropdownOpen}
            setIsNotificationDropdownOpen={setIsNotificationDropdownOpen}
            isNotificationDropdownOpen={isNotificationDropdownOpen}
          />

          <DropdownAvatar
            avatarDropdownRef={avatarDropdownRef}
            setIsAvatarDropdownOpen={setIsAvatarDropdownOpen}
            isAvatarDropdownOpen={isAvatarDropdownOpen}
            setIsNotificationDropdownOpen={setIsNotificationDropdownOpen}
            user={user}
          />
        </div>
      </div>
    </div>
  )
}
