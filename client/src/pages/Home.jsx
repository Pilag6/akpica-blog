import { Link } from "react-router-dom"
import Logo from "@assets/logo-white.png";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-akpica-carlo">
      <img className="w-72" src={Logo} alt="" />
      <div className="mb-12 -mt-10 text-2xl font-semibold">Website Under Construction</div>
      <Link className="py-4 px-8 text-2xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2" to="/dh-admin">Go to Dashboard</Link>
    </div>
  )
}
export default Home