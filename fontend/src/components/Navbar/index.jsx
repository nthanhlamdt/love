import NavbarScreenSmall from './NavbarScreenSmall'
import NavbarScreenBig from './NavbarScreenBig'
import Dropdown from './Dropdown'

function index({ user }) {
  return (
    <div className="flex items-center justify-between bg-pink-600 text-white">
      <NavbarScreenSmall />
      <NavbarScreenBig />

      <Dropdown user={user} />
    </div>
  )
}

export default index
