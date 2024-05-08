/* eslint-disable react/prop-types */

import Logo from "@assets/logo-white.png";

const Dashboard = () => {
    return (
        
            <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-80px)]">
                <img className="w-72" src={Logo} alt="" />
                <h2 className="py-4 px-20 text-2xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2">Dashboard</h2>
            </div>
    
    );
};
export default Dashboard;
