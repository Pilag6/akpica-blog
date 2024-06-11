/* eslint-disable react/prop-types */
import { CiCalendarDate } from "react-icons/ci";

const AuthorDate = ({ avatar, author, date, colors, bottom, bgColor }) => {
    return (
      <>
        <div className={`flex items-center gap-2 ${bottom} ${bgColor}`}>
          <img
            src={avatar}
            alt={author}
            className="w-5 h-5 rounded-full object-cover"
          />
          <p className={`${colors}`}>{author}</p>
          <div className={`flex items-center gap-1 ${colors}`}>
            <CiCalendarDate />

            <p className={`font-akpica-heading font-[500] ${colors}`}>
              {date || new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </>
    );
};
export default AuthorDate;
