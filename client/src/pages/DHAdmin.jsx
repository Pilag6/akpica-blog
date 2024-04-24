import { NavLink } from "react-router-dom";

// Assets
import logoWhite from "../assets/logo-white.png";

const BtnClasses =
  "mt-7 py-4 text-2xl w-80 font-semibold text-white outline-none outline-white transition-all hover:bg-[#B3C4A2] hover:text-zinc-800 hover:outline-2 text-center";

const DHAdmin = () => {
  return (
    <div
      style={{
        backgroundImage: "url(" + "https://bit.ly/4b8EP6V",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed w-full mx-auto"
    >
      <div className="h-screen flex justify-center items-center flex-col w-3/4 mx-auto">
        <div>
          <img
            className="flex justify-center items-center mx-auto"
            src={logoWhite}
            alt=""
            width={180}
          />
        </div>
        <div className="mb-20 text-2xl font-semibold">Welcome</div>
        <div className="flex justify-center items-center gap-8 w-3/4 mx-auto">
          <NavLink to="/dh-admin/register" className={BtnClasses}>
            Register
          </NavLink>
          <NavLink to="/dh-admin/login" className={BtnClasses}>
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default DHAdmin;
