import { useState, useContext, useEffect, useRef } from "react";
import FourCards from "./FourCards.jsx";

// Backend URL
import BACKEND_URL from "@utils/backendUrl.js";

// Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Context
import { PostContext } from "@contexts/PostContext.jsx";

const FourCardsContainer = () => {
  const { posts } = useContext(PostContext);
  const [slide, setSlide] = useState(0);

//   const totalSlides = Math.max(0, posts.length - 3);
const reversedPosts = [...posts].reverse();
const totalSlides = Math.max(0, reversedPosts.length - 3);

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
    <div className="mx-auto flex my-11 relative overflow-hidden w-full">
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
        {reversedPosts.slice(slide, slide + 4).map((card) => (
          <FourCards
            key={card._id}
            bgImage={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
              card.title
            )}?${new Date().getTime()}`}
            category={card.tags[0]}
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
            linkTag={`/tags/${card.tags[0]}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FourCardsContainer;
