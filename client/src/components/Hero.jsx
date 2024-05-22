import { useState, useEffect } from "react";
import CardTag from "@components/miniComponents/CardTag.jsx";
import AvatarDate from "@components/miniComponents/AuthorDate.jsx";

import akiko from "../../../server/uploads/akiko.jpg";
import carlos from "../../../server/uploads/carlos.jpg";
import pila from "../../../server/uploads/Pila.jpg";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useContext } from "react";
import { PostContext } from "@contexts/PostContext.jsx";

const images = [
    {
        url: "https://bit.ly/44JzQra",
        title: "First Slide Title",
        tag: "PRODUCTIVITY",
        author: "Akpica",
        date: "May 25, 2024",
        avatar: "/favicon.png"
    },
    {
        url: "https://bit.ly/4dIOfIe",
        title: "Second Slide Title",
        tag: "JAVASCRIPT",
        author: "Akiko",
        date: "May 20, 2024",
        avatar: akiko
    },
    {
        url: "https://bit.ly/3WK8Kyr",
        title: "Third Slide Title",
        tag: "NODE",
        author: "Carlos",
        date: "May 05, 2024",
        avatar: carlos
    },
    {
        url: "https://bit.ly/4bDVXSc",
        title: "Fourth Slide Title",
        tag: "DEVELOPMENT",
        author: "Pila",
        date: "May 25, 2024",
        avatar: pila
    }
];

const Hero = () => {

    const {posts} = useContext(PostContext);

    // console.log(posts);
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex]);

    return (
        <div className="relative w-full h-[65vh] z-10 group">
            {posts.map((image, index) => (
                <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-[3000ms] ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        backgroundImage: `url(http://localhost:3300/posts/photo/${encodeURIComponent(image.title)}?${new Date().getTime()})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className="flex flex-col justify-center h-full max-w-[1200px] mx-auto p-6 gap-2">
                        <CardTag
                            tag={image.tags}
                            color="bg-akpica-marco text-akpica-white"
                            size="text-md"
                        />
                        <div className="md:w-1/2 p-2">
                            <h1 className="w-fit decoration-clone text-5xl bg-akpica-white px-5 leading-snug inline uppercase font-[700] font-akpica-heading text-akpica-black">
                                {image.title}
                            </h1>
                        </div>
                        <AvatarDate
                            avatar={`http://localhost:3300/photo/${
                                image.author.username
                            }?${new Date().getTime()}`}
                            author={image.author.username}
                            date={new Date(image.date).toDateString()}
                            colors="text-akpica-white"
                        />
                    </div>
                </div>
            ))}
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-akpica-marco text-akpica-carlo px-2 py-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={prevSlide}
            >
                <FaChevronLeft />
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-akpica-marco text-akpica-carlo px-2 py-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={nextSlide}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Hero;
