/* eslint-disable react/prop-types */
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";
import CardTag from "../../miniComponents/CardTag.jsx";
import { Link } from "react-router-dom";
//icons

const FourCards = ({
  bgImage,
  category,
  title,
  author,
  avatar,
  date,
  link,
  linkTag
}) => {
  return (
    <>
      <article className="h-[500px] cursor-grab group relative w-full overflow-hidden">
        <Link to={link}>
          <img
            src={bgImage}
            alt=""
            className="cursor-pointer group-hover:scale-110 transition-transform transform duration-300 ease-in-out h-full object-cover w-full min-w-[243px] md:min-w-[420px]"
          />
        </Link>

        {/* text banner */}
        <div className="flex flex-col h-full w-full absolute top-[70%] group-hover:top-[60%] gap-4 text-akpica-white p-4 bg-akpica-black/70 to-akpica-white/5 group-hover:bg-akpica-black/90 transition-all duration-300 ease-in-out px-5">
          {/* flex flex-col h-full w-full absolute top-[75%] left-0 group-hover:top-[65%]  gap-4 text-akpica-white p-4 bg-akpica-black/70 to-akpica-white/5 group-hover:bg-akpica-black/90 transition-all */}

          <CardTag
            tag={category}
            color="bg-akpica-pastel text-akpica-black"
            size="text-xs"
            link={linkTag}
          />

          <div className="">
            <Link to={link}>
              <h1 className="text-2xl font-bold mb-2 font-akpica-heading leading-6 [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-akpica-carlo">
                {title}
              </h1>
            </Link>
            <AuthorDate avatar={avatar} author={author} date={date} />

            <button className="text-white border mt-20 px-3 py-1 bg-akpica-carlo hover:bg-akpica-green group-hover:mt-4 transition-all delay-100 duration-200 ease-in-out">
              <Link to={link}>See more</Link>
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default FourCards;
