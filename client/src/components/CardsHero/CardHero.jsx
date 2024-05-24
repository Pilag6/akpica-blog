/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import CardTag from "../miniComponents/CardTag.jsx";
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";

const CardHero = ({
  bgImg,
  tagName,
  title,
  author,
  avatar,
  date,
  colorTag,
  sizeTag,
  width,
  link,
}) => {
  return (
    <>
      <article
        className={`overflow-hidden border-t-8 border-akpica-white h-full ${width}`}
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="text-white p-4 flex flex-col justify-between min-h-64 bg-gradient-to-t from-akpica-black/90 to-akpica-white/5 h-full">
          <CardTag tag={tagName} color={colorTag} size={sizeTag} />

          <div>
            <Link to={link} className="pr-6">
              <h2 className="text-2xl font-bold mt-auto mb-2 font-akpica-heading leading-6 [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-akpica-carlo">
                {title}
              </h2>
            </Link>
            <AuthorDate avatar={avatar} author={author} date={date} />
          </div>
        </div>
      </article>
    </>
  );
};
export default CardHero;
