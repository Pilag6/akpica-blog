/* eslint-disable react/prop-types */
// Header.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Navbar from "./Navbar.jsx";

// logo
import logo from "../../assets/logo-black-h.png";

const Header = ({ darkBackground }) => {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const backgroundColor = darkBackground ? "#242424d1" : (scrolling ? "#242424" : "transparent");

    return (
        <header
            className={`fixed w-full z-50 transition-colors duration-300`}
            style={{ backgroundColor }}
        >
            <div className="max-w-[1200px] mx-auto flex items-center justify-between px-8">
                <Link to={"/"} className="w-40 block ">
                    <img
                        className="cursor-pointer transition-colors duration-300 filter invert saturate-0 hue-rotate-0 brightness-0 contrast-75"
                        src={logo}
                        alt="akpica-logo"
                    />
                </Link>

                {/* navbar */}
                <Navbar />
            </div>
        </header>
    );
};

export default Header;
