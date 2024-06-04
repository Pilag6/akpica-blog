/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function SmoothScroll({ children }) {
    const location = useLocation();
    const navType = useNavigationType();
    useEffect(() => {
        if (navType !== "POP") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
                // instant is another option. It does direct to the top without the scroll
            });
        }
    }, [location, navType]);
    return <>{children}</>;
}
export default SmoothScroll;