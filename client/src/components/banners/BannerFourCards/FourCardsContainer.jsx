import { useState, useContext } from "react";
import { PostContext } from "@contexts/PostContext.jsx";
import FourCards from "./FourCards.jsx";

// Backend URL
import BACKEND_URL from "@utils/backendUrl.js";

// Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FourCardsContainer = () => {
  const { posts } = useContext(PostContext);
  const [slide, setSlide] = useState(0);

  const totalSlides = Math.ceil(posts.length / 4);

  // START slider handlers
  const handlePrevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };
  const handleNextSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };
  // END slider handlers

  return (
    <div className="mx-auto flex my-11 relative border border-red-600 overflow-hidden">
      <div className="absolute p-5 top-1/2 -translate-y-1/2 z-10 text-5xl w-full flex justify-between opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          className="bg-akpica-black/70 to-akpica-white/5 text-akpica-white hover:bg-akpica-black"
          onClick={handlePrevSlide}
        >
          <IoIosArrowBack />
        </button>
        <button
          className="bg-akpica-black/70 to-akpica-white/5 text-akpica-white hover:bg-akpica-black"
          onClick={handleNextSlide}
        >
          <IoIosArrowForward />
        </button>
      </div>

      <div className="flex">
        {posts.slice(slide * 4, slide * 4 + 4).map((card) => (
          <FourCards
            key={card._id}
            bgImage={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
              card.title
            )}?${new Date().getTime()}`}
            category={card.tags}
            title={card.title}
            avatar={`${BACKEND_URL}/photo/${
              card.author.username
            }?${new Date().getTime()}`}
            author={
              card.author.username[0].toUpperCase() +
              card.author.username.slice(1)
            }
            date={new Date(card.date).toDateString()}
            link={`/${card._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FourCardsContainer;
