/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const CategoryImgCard = ({ Bgimage, title, link }) => {
    return (
        <>
            <article
                className="flex justify-center items-center text-center w-[48%] md:w-[290px] h-[130px] "
                style={{
                    backgroundImage: `url(${Bgimage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <Link to={link} className="bg-gradient-to-t from-akpica-black/80 to-akpica-black/10 w-full h-full flex justify-center items-center">
                    <h3 className="text-white text-2xl font-[700] font-akpica-heading tracking-wide">
                        {title}
                    </h3>
                </Link>
            </article>
        </>
    );
};
export default CategoryImgCard;
