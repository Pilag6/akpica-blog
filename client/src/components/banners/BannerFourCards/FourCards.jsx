//icons
import { CiCalendarDate } from "react-icons/ci";

const FourCards = ({ bgImage, category, title, author, avatar, date }) => {

  return (
    <>
      <article className="h-[500px] cursor-pointer group relative overflow-hidden w-1/4">
        <img
          src={bgImage}
          alt=""
          className="group-hover:scale-110 transition-transform transform duration-300"
        />

        <div className="flex flex-col h-full w-full absolute top-[75%] group-hover:top-[65%] gap-4 text-akpica-white p-4 bg-akpica-black/70 to-akpica-white/5 group-hover:bg-akpica-black">
          <p className="bg-akpica-tomato w-fit px-2 py-[2px] text-xs font-semibold">
            {category}
          </p>

          <div className="">
            <h1 className="text-2xl font-bold mb-2 font-akpica-heading leading-6 [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-akpica-carlo">
              {title}
            </h1>

            <div className="flex items-center gap-2">
              <img
                src={avatar}
                alt={author}
                className="w-5 h-5 rounded-full object-cover"
              />

              <p> {author}</p>

              <div className="flex items-center gap-1">
                <CiCalendarDate />
                <p className="font-akpica-heading font-[500]">
                  {date || new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <button className="text-white mt-5 px-3 py-1 bg-akpica-carlo hover:bg-akpica-green group-hover:mt-4 transition group-hover:delay-500 duration-300 ease-in-out">
              See more
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default FourCards;
