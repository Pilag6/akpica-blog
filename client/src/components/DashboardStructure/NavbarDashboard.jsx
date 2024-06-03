import LogoBlackH from '@assets/logo-black-h.png'
import { Link } from 'react-router-dom'

const NavbarDashboard = () => {
  return (
    <div className='flex items-center gap-3 w-full'>
      <div className='text-white'>
       <h1>hello</h1>
      </div>
      <Link to={"/"}><img className='h-20' src={LogoBlackH} alt=""/></Link>
      
    </div>
  )
}
export default NavbarDashboard