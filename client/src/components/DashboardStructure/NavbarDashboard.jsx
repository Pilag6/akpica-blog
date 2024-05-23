import LogoBlackH from '@assets/logo-black-h.png'
import { Link } from 'react-router-dom'

const NavbarDashboard = () => {
  return (
    <div>
      <Link to={"/"}><img className='h-20' src={LogoBlackH} alt=""/></Link>
    </div>
  )
}
export default NavbarDashboard