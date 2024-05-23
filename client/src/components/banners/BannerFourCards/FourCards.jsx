/* eslint-disable react/prop-types */
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";
import CardTag from "../../miniComponents/CardTag.jsx";
import { Link } from "react-router-dom";
//icons


const FourCards = ({ bgImage, category, title, author, avatar, date, link }) => {
    return (
        <>
            <article className="h-[500px] cursor-pointer group relative overflow-hidden w-1/4">
                <Link to={link}>
                <img
                    src={bgImage}
                    alt=""
                    className="group-hover:scale-110 transition-transform transform duration-300 h-full object-cover"
                />
                </Link>
                <div className="flex flex-col h-full w-full absolute top-[75%] group-hover:top-[65%] gap-4 text-akpica-white p-4 bg-akpica-black/70 to-akpica-white/5 group-hover:bg-akpica-black/90 transition-all">
                 
                    <CardTag
                        tag={category}
                        color="bg-akpica-pastel text-akpica-black"
                        size="text-xs"
                    />

                    <div className="">
                        <Link to={link}>
                        <h1 className="text-2xl font-bold mb-2 font-akpica-heading leading-6 [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-akpica-carlo">
                            {title}
                        </h1>
                        </Link>
                        <AuthorDate
                            avatar={avatar}
                            author={author}
                            date={date}
                        />

                        <button className="text-white mt-20 px-3 py-1 bg-akpica-carlo hover:bg-akpica-green group-hover:mt-4 transition-all delay-100 duration-200 ease-in-out">
                           <Link to={link}>See more</Link> 
                        </button>
                    </div>
                </div>
            </article>
        </>
    );
};

export default FourCards;
