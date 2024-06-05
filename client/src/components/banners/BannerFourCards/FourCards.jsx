/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// Components
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";
import CardTag from "@components/miniComponents/CardTag.jsx";


const FourCards = ({
  bgImage,
  category,
  title,
  author,
  avatar,
  date,
  bottom,
  link,
  linkTag
}) => {
  return (
    <>
      <article className="h-[500px] cursor-pointer group relative w-screen md:w-1/4 overflow-hidden">
        <Link to={link}>
          <img
            src={bgImage}
            alt=""
            className="cursor-pointer group-hover:scale-110 transition-transform transform duration-300 ease-in-out h-full object-cover "
          />
        </Link>

        {/* text banner */}
        <div className="flex flex-col h-[45%] md:h-1/3 md:group-hover:h-1/2 w-full absolute bottom-0 gap-4 text-akpica-white p-4 bg-akpica-black/70 to-akpica-white/5 group-hover:bg-akpica-black/90 transition-all duration-300 ease-in-out px-5">
          <CardTag
            tag={category}
            color="bg-akpica-pastel text-akpica-black"
            size="text-xs"
            link={linkTag}
          />

            <Link to={link}>
              <h1 className="text-2xl font-bold mb-2 font-akpica-heading leading-6 [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-akpica-carlo">
                {title}
              </h1>
            </Link>
            <AuthorDate avatar={avatar} author={author} date={date} bottom={bottom} />
          <div className="flex flex-col mt-auto">

            <button className="text-white border w-fit px-3 py-1 bg-akpica-carlo hover:bg-akpica-green md:translate-y-14 md:group-hover:-translate-y-5 transition-all delay-100 duration-200 ease-in-out">
              <Link to={link}>See more</Link>
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default FourCards;
