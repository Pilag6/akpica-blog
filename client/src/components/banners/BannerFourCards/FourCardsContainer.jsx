import FourCards from "./FourCards.jsx";

//icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// images imports
import akiko from "../../../../../server/uploads/akiko.jpg";
import carlos from "../../../../../server/uploads/carlos.jpg";
import pila from "../../../../../server/uploads/Pila.jpg";
import { useState, useContext } from "react";
import { PostContext } from "@contexts/PostContext.jsx";

// ({ bgImage, category, title, author, avatar, date }) => {

const FourCardsContainer = () => {
  let { posts } = useContext(PostContext);
  const [arrow, setArrow] = useState(0);

  // START arrow
  const handlePrevSlide = () => {
    setArrow((prevArrow) =>
      prevArrow === 0 ? imageSlider.length - 1 : prevArrow - 1
    );
  };
  const handleNextSlide = () => {
    setArrow((prevArrow) =>
      prevArrow === imageSlider.length - 1 ? 0 : prevArrow + 1
    );
  };
  // END arrow

  return (
    // <div className="w-full mx-auto flex my-11 group relative">
    <div className="w-full mx-auto flex my-11 relative">
      
      <div className="absolute p-5 top-1/2 -translate-y-1/2 z-10 text-5xl w-full flex justify-between opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          className="bg-akpica-black/70 to-akpica-white/5  text-akpica-white"
          onClick={handlePrevSlide}
        >
          <IoIosArrowBack />
        </button>
        <button
          className="bg-akpica-black/70 to-akpica-white/5  text-akpica-white"
          onClick={handleNextSlide}
        >
          <IoIosArrowForward />
        </button>
      </div>

      {posts && posts.slice(0, 4).map((card) => (
        <FourCards key={card._id}
        bgImage={`http://localhost:3300/posts/photo/${encodeURIComponent(
          card.title
      )}?${new Date().getTime()}`}
      category={card.tags}
      title={card.title}
      avatar={`http://localhost:3300/photo/${
        card.author.username
    }?${new Date().getTime()}`}
    author={card.author.username} 
    date={new Date(card.date).toDateString()}/>
      ))}

      {/* <FourCards
        bgImage={"https://bit.ly/3QLDXNI"}
        category={"REACT"}
        title={"React Starter Blog"}
        avatar={carlos}
        author={"Carlos"}
        date={"May 16, 2024"}
      />

      <FourCards
        bgImage={"https://bit.ly/3UZFpyD"}
        category={"TAILWIND"}
        title={"Tailwind Starter Blog"}
        avatar={akiko}
        author={"Akiko"}
        date={"May 16, 2024"}
      />

      <FourCards
        bgImage={"https://bit.ly/3ymKhoz"}
        category={"ASTRO"}
        title={"Astro Starter Blog"}
        avatar={pila}
        author={"Pila"}
        date={"May 16, 2024"}
      />

      <FourCards
        bgImage={"https://bit.ly/3wAUhKu"}
        category={"CSS"}
        title={"CSS Starter Blog"}
        avatar={pila}
        author={"Pila"}
        date={"May 16, 2024"}
      /> */}
    </div>
  );
};
export default FourCardsContainer;
