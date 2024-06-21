/* eslint-disable react/prop-types */
// Link Router
import { Link } from "react-router-dom";

// Icons
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

// Components
import PortfolioCard from "@components/AboutUs/PortfolioCard.jsx";

// Styles
const linkStyle = "border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-akpica-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11";

const AboutUsCard = ({
    profilepicture,
    name,
    text,
    portfolioImg,
    portfolioUrl,
    github,
    linkedin
}) => {
    return (
        <div className="w-96 m-4 flex flex-col items-center bg-gray-800 border border-akpica-green card transform transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gray-700 py-4">
            <div className="mb-8 mt-4 w-32 h-32">
                <img
                    src={profilepicture}
                    alt="profilepicture"
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
            <h2 className="mb-4 text-3xl font-semibold font-akpica-heading">
                {name}
            </h2>
            <p className="mb-6 px-8">{text}</p>
            <div className="mt-auto">
                <h3 className="mb-4 text-2xl font-bold font-akpica-heading">
                    Personal Portfolio
                </h3>
                <div>
                    <PortfolioCard
                        image={portfolioImg}
                        imageUrl={portfolioUrl}
                    />
                </div>
                <div className="flex flex-row items-center justify-center flex-wrap py-1">
                    <div className="flex gap-3 mb-4 ">
                        <Link
                            to={github}
                            target="_blank"
                            className={linkStyle}
                        >
                            <FaGithubSquare />
                        </Link>
                        <Link
                            to={linkedin}
                            target="_blank"
                            className={linkStyle}
                        >
                            <FaLinkedin />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsCard;
