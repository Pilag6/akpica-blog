/* eslint-disable react/prop-types */
import { CiCalendarDate } from "react-icons/ci";


const CardHero = ({bgImg, tag, title, author, avatar, date}) => {
    return (
        <>
            <article
                className="flex-1 overflow-hidden"
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
            >
                <div className="text-white p-4 flex flex-col justify-between min-h-64 bg-gradient-to-t from-akpica-black/90 to-akpica-white/5">
                    <p className="bg-akpica-tomato w-fit px-2 py-[2px] text-xs font-semibold">
                        {tag}
                    </p>
                    <div className="pr-6">
                        <h2 className="text-2xl font-bold mt-auto mb-2 font-akpica-heading leading-6 [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-akpica-carlo">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2">
                            <img
                                src={avatar}
                                alt={author}
                                className="w-5 h-5 rounded-full object-cover"
                            />
                            <p>{author}</p>
                            <div className="flex items-center gap-1">
                                <CiCalendarDate />

                                <p className="font-akpica-heading font-[500]">
                                    {date || new Date().toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};
export default CardHero;
