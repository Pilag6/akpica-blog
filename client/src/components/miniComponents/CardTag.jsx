/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const CardTag = ({ tag, color, size, link }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                navigate(link);
            });
        } else {
            navigate(link);
        }
    };

    return (
        <button
            onClick={handleNavigation}
            className={`${color} ${size} w-fit px-2 py-[2px] font-semibold tracking-wider uppercase`}
        >
            {tag}
        </button>
    );
};

export default CardTag;
