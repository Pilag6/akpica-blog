/* eslint-disable react/prop-types */
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";
import CardTag from "@components/miniComponents/CardTag.jsx";


const CardMoreFromUs = ({ img, title, tag, author, avatar, date, authorColors, bottom }) => {
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

                    <AuthorDate avatar={avatar} author={author} date={date} colors={authorColors} bottom={bottom} />
                    
                </div>
            </article>
        </>
    );
};
export default CardMoreFromUs;
