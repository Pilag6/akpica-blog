/* eslint-disable react/prop-types */
import CardTag from "@components/miniComponents/CardTag.jsx";
import { CiCalendarDate } from "react-icons/ci";
const CardMoreFromUs = ({ img, title, tag, avatar, author, date }) => {
    return (
        <>
            <article className="flex gap-4 w-96">
                <div className="w-36 h-40 aspect-square">
                    <img
                        src={img}
                        alt={title}
                        className=" object-cover w-full h-full"
                    />
                </div>
                <div className="flex flex-col pb-3">
                    <CardTag
                        tag={tag}
                        color="bg-akpica-green text-akpica-white"
                        size="text-sm"
                    />
                    <h2 className="text-2xl font-bold my-2 mb-2 font-akpica-heading leading-6  shadow-akpica-carlo">
                        {title}
                    </h2>
                    <div className="flex items-center gap-2 mt-auto">
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
            </article>
        </>
    );
};
export default CardMoreFromUs;
