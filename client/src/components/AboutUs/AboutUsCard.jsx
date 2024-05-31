
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import PortfolioCard from "@components/AboutUs/PortfolioCard.jsx";
import { Link } from "react-router-dom";

const AboutUsCard = ({
  profilepicture,
  name,
  text,
  portfolioImg,
  portfolioUrl,
  github,
  linkedin,
}) => {
  return (
    <div className="w-96 m-4 flex flex-col items-center bg-gray-800 border border-akpica-green card transform transition-transform duration-300 ease-in-out hover:scale-110">
      <div className="mb-8 mt-4 w-32 h-32">
        <img
          src={profilepicture}
          alt="profilepicture"
          className="w-full h-full rounded-full object-cover"
        />
        {/* need to fetch the picture from uploads/cloudinary */}
      </div>
      <h2 className="mb-4 text-3xl font-semibold">{name}</h2>
      <p className="mb-4 font-semibold px-4">{text}</p>
      <h3 className="mb-4 text-2xl font-bold">Personal Portfolio</h3>
      <div>
        <PortfolioCard image={portfolioImg} imageUrl={portfolioUrl} />
      </div>
      <div className="flex flex-row flex-wrap py-1">
        <div className="flex gap-3 mb-4 ">
          <Link
            to={github}
            target="_blank"
            className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-akpica-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
          >
            <FaGithubSquare />
          </Link>
          <Link
            to={linkedin}
            target="_blank"
            className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCard;
