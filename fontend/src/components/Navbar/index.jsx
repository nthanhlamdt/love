import NavbarScreenSmall from './NavbarScreenSmall'
import NavbarScreenBig from './NavbarScreenBig'
import Dropdown from './Dropdown'

function index({ user }) {
  return (
    <div className="flex top-0 left-0 right-0 shadow-md z-10 items-center justify-between bg-pink-600 text-white">
      <NavbarScreenSmall />
      <NavbarScreenBig />

      <Dropdown user={user} />
    </div>
  )
}

export default index
