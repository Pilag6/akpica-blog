import { Link } from "react-router-dom";
import { useContext } from "react";
import LogoBlackH from "@assets/logo-black-h.png";
import { ToggleContext } from "@contexts/ToggleContext.jsx";

// icon
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

const NavbarDashboard = () => {
  const {isOpen, handleOpen} = useContext(ToggleContext);
  console.log("open", handleOpen);
  return (
    <div className="flex items-center w-full">
      <div className="text-white">
        <button className={`text-akpica-black text-3xl w-20 flex justify-center p-4 ${!isOpen ? "rotate-180" : "rotate-0"}`} onClick={handleOpen}>
          <TbLayoutSidebarLeftCollapse />
        </button>
      </div>
      <Link to={"/"}>
        <img className="h-20" src={LogoBlackH} alt="" />
      </Link>
    </div>
  );
};
export default NavbarDashboard;
