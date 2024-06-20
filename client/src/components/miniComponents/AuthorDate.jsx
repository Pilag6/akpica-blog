/* eslint-disable react/prop-types */
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const AuthorDate = ({ avatar, author, date, colors, bottom, bgColor, authorLink, hidden }) => {
  const navigate = useNavigate();

    const handleNavigation = () => {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                navigate(authorLink);
            });
        } else {
            navigate(authorLink);
        }
    };
    return (
      <>
        <div className={`flex items-center gap-2 ${bottom} ${bgColor}`}>
          <button onClick={handleNavigation} className={`${hidden}`}>
            <img
              src={avatar}
              alt={author}
              className={`w-5 h-5 rounded-full object-cover `}
            />
          </button>
          <button onClick={handleNavigation}><p className={`${colors}`}>{author}</p></button>
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
