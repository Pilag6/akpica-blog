/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// Components
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";
import CardTag from "@components/miniComponents/CardTag.jsx";

const CardMoreFromUs = ({
    img,
    title,
    tag,
    author,
    avatar,
    date,
    authorColors,
    bottom,
    link,
    linkTag,
    h2Color,
    authorLink
}) => {
    return (
        <>
            <article className="flex gap-4 w-96">
                <Link to={link} className="max-w-32 h-40 aspect-square">
                    <img
                        src={img}
                        alt={title}
                        className=" object-cover w-full h-full"
                    />
                </Link>
                <div className="flex flex-col pb-3">
                    <CardTag
                        tag={tag}
                        color="bg-akpica-green text-akpica-white"
                        size="text-sm"
                        link={linkTag}
                    />
                    <Link to={link}>
                        <h2
                            className={`text-2xl font-bold my-2 mb-2 font-akpica-heading leading-6  shadow-akpica-carlo ${h2Color}`}
                        >
                            {title}
                        </h2>
                    </Link>
                    <AuthorDate
                        avatar={avatar}
                        author={author}
                        date={date}
                        colors={authorColors}
                        bottom={bottom}
                        authorLink={authorLink}
                    />
                </div>
            </article>
        </>
    );
};
export default CardMoreFromUs;
