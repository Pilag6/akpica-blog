/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";

// icons
import { FaBars } from "react-icons/fa6";

import SearchBar from "@components/Header/SearchBar.jsx";
import { ToggleContext } from "@contexts/ToggleContext.jsx";
import { PostContext } from "@contexts/PostContext.jsx";
import useAuth from "@utils/useAuth.js";

const Navbar = ({ scrolling }) => {
  const { isToggle, handleToggle, setIsToggle } = useContext(ToggleContext);
  const { posts } = useContext(PostContext);
  const { user } = useAuth();
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        // Click outside of navbar, close it
        if (isToggle) {
          setIsToggle(false);
        }
      }
    };

    if (isToggle) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isToggle, setIsToggle]);

  const linkStyles = `pl-4 hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white`;
  const mobileLinkStyles = `p-4 hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white`;

  return (
    <div ref={navbarRef} className="flex items-center justify-between px-5">
      <nav className="md:flex items-center justify-center gap-5 text-lg hidden">
        <NavLink className={linkStyles} to={"/tags/frontend"}>
          Frontend
        </NavLink>
        <NavLink className={linkStyles} to={"/tags/backend"}>
          Backend
        </NavLink>
        <NavLink className={linkStyles} to={"/tags/uxui%20design"}>
          UX/UI Design
        </NavLink>
        <NavLink className={linkStyles} to={"/about"}>
          About Us
        </NavLink>
        
        {user && (
          <NavLink
            className={`${mobileLinkStyles} md:bg-akpica-tomato`}
            to={"/dh-admin/dashboard"}
          >
            Dashboard
          </NavLink>
        )}
      </nav>

      <div className={`md:hidden flex gap-6 text-lg pl-5 text-akpica-white`}>
        <FaBars onClick={handleToggle} />
      </div>

      {isToggle && (
        <nav
          className={`absolute md:hidden flex flex-col items-center gap-4 text-lg z-10 top-[62px] right-0 w-full py-8 ${
            scrolling ? "bg-akpica-black" : "bg-akpica-black"
          }`}
        >
          <div onClick={handleToggle} className="flex flex-col items-center">
            <NavLink className={mobileLinkStyles} to={"/tags/frontend"}>
              Frontend
            </NavLink>
            <NavLink className={mobileLinkStyles} to={"/tags/backend"}>
              Backend
            </NavLink>
            <NavLink className={mobileLinkStyles} to={"/tags/uxui%20design"}>
              UX/UI Design
            </NavLink>
            <NavLink className={mobileLinkStyles} to={"/about"}>
              About us
            </NavLink>
            {user && (
              <NavLink
                className={`${mobileLinkStyles} bg-akpica-tomato`}
                to={"/dh-admin/dashboard"}
              >
                Dashboard
              </NavLink>
            )}
          </div>
        </nav>
      )}

      {/* search bar */}
      <SearchBar placeholder="Search . . ." data={posts} />
    </div>
  );
};

export default Navbar;