import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Navbar from "./Navbar.jsx";

// logo
import logo from "../../assets/logo-black-h.png";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarStyle =`bg-transparent fixed w-full z-10 transition-colors duration-300 ${scrolling ? 'bg-[#242424] text-[#ebebeb]' : 'bg-transparent'}`
  
  {/* filter invert-[100] sepia-[76] saturate-[114%] hue-rotate-[212%] brightness-[119%] contrast-[84%] w-[130px] cursor-pointer */}
  const logoStyle = `w-[130px] cursor-pointer transition-colors duration-300 ${scrolling ? 'filter invert saturate-0 hue-rotate-0 brightness-0 contrast-75' : ''}`

  return (
    <div className={navbarStyle}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-8">
        <Link to={"/"} className="w-[200px] ">

          <img
            className={logoStyle}
            src={logo}
            alt="akpica-logo"
          />
        </Link>

        {/* navbar */}
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
