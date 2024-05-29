import { useState, useContext, useEffect, useRef } from "react";
import { PostContext } from "@contexts/PostContext.jsx";
import FourCards from "./FourCards.jsx";
import BACKEND_URL from "@utils/backendUrl.js";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FourCardsContainer = () => {
  const { posts } = useContext(PostContext);
  const [slide, setSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const containerRef = useRef(null);

  const totalSlides = Math.ceil(posts.length / 4);

  const handlePrevSlide = () => {
    setSlide((prevSlide) => (prevSlide === 0 ? totalSlides - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setSlide((prevSlide) => (prevSlide === totalSlides - 1 ? 0 : prevSlide + 1));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setPrevTranslate(currentTranslate);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const currentPosition = e.pageX;
      setCurrentTranslate(prevTranslate + currentPosition - startX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100) {
      handleNextSlide();
    } else if (movedBy > 100) {
      handlePrevSlide();
    }
    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, startX, currentTranslate, prevTranslate]);

  // Duplicate posts to create an infinite loop effect
  const extendedPosts = [...posts, ...posts];

  return (
    <div ref={containerRef} className="cursor-grab mx-auto flex my-11 relative overflow-hidden w-full left-0">
      <div className="absolute p-5 top-1/2 -translate-y-1/2 z-10 text-5xl w-full flex justify-between opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out active:cursor-grabbing">
        <button className="bg-akpica-black/70 to-akpica-white/5 text-akpica-white hover:bg-akpica-black" onClick={handlePrevSlide}>
          <IoIosArrowBack />
        </button>
        <button className="bg-akpica-black/70 to-akpica-white/5 text-akpica-white hover:bg-akpica-black" onClick={handleNextSlide}>
          <IoIosArrowForward />
        </button>
      </div>

      <div className="flex" style={{ transform: `translateX(${currentTranslate}px)` }}>
        {extendedPosts.slice(slide * 4, slide * 4 + 4).map((card, index) => (
          <FourCards
            key={`${card._id}-${index}`}
            bgImage={`${BACKEND_URL}/posts/photo/${encodeURIComponent(card.title)}?${new Date().getTime()}`}
            category={card.tags[0]}
            title={card.title}
            avatar={`${BACKEND_URL}/photo/${card.author.username}?${new Date().getTime()}`}
            author={card.author.username[0].toUpperCase() + card.author.username.slice(1)}
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
