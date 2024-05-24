import { Link } from "react-router-dom";

const cardTag = ({ tag, color, size, link }) => {
    return (
        <>
            <Link to={link} className={`${color} ${size} w-fit px-2 py-[2px] font-semibold tracking-wider uppercase`}>
                {tag}
            </Link>
        </>
    );
};
export default cardTag;
