/* eslint-disable react/prop-types */
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";

const AuthorDate = ({ avatar, author, date, colors, bottom, bgColor, authorLink, hidden }) => {
    return (
      <>
        <div className={`flex items-center gap-2 ${bottom} ${bgColor}`}>
          <Link to={authorLink} className={`${hidden}`}>
            <img
              src={avatar}
              alt={author}
              className={`w-5 h-5 rounded-full object-cover `}
            />
          </Link>
          <Link to={authorLink}><p className={`${colors}`}>{author}</p></Link>
          <div className={`flex items-center gap-1 ${colors}`}>
            <CiCalendarDate />

            <p className={`font-akpica-heading font-[500] pt-[5px] ${colors}`}>
              {date || new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </>
    );
};
export default AuthorDate;
