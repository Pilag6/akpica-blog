import { NavLink } from "react-router-dom";

const BtnClasses = "mt-7 py-4 text-2xl w-80 font-semibold text-white outline-none outline-white transition-all hover:bg-[#B3C4A2] hover:text-zinc-800 hover:outline-2 text-center";

const DHAdmin = () => {
    return (
        <div className="h-screen flex justify-center w-80 items-center gap-8 w-3/4 mx-auto">
  
            <NavLink to="/dh-admin/register" className={BtnClasses}>
                Register
            </NavLink>
            <NavLink to="/dh-admin/login" className={BtnClasses}>
                Login
            </NavLink>


        </div>
    );
};
export default DHAdmin;
