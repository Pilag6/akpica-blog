import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CardTag from "@components/miniComponents/CardTag.jsx";
import AvatarDate from "@components/miniComponents/AuthorDate.jsx";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { PostContext } from "@contexts/PostContext.jsx";

const Hero = () => {
    const { posts } = useContext(PostContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Limit to first 4 posts
    const limitedPosts = posts.slice(0, 4);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? limitedPosts.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === limitedPosts.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === limitedPosts.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [limitedPosts.length]);

    return (
        <div className="relative w-full h-[65vh] z-10 group">
            {limitedPosts && limitedPosts.map((post, index) => (
                <div
                    key={post._id}
                    className={`absolute w-full h-full transition-all duration-[3000ms] ${
                        index === currentIndex ? "opacity-100 z-50" : "opacity-0"
                    }`}
                    style={{
                        backgroundImage: `url(http://localhost:3300/posts/photo/${encodeURIComponent(post.title)}?${new Date().getTime()})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className="flex flex-col justify-center h-full max-w-[1200px] mx-auto p-6 gap-2">
                        <CardTag
                            tag={post.tags}
                            color="bg-akpica-marco text-akpica-white"
                            size="text-md"
                        />
                        <Link to={`${post._id}`} className="md:w-1/2 p-2">
                            <h1 className="w-fit decoration-clone text-5xl bg-akpica-white px-5 leading-snug inline uppercase font-[700] font-akpica-heading text-akpica-black">
                                {post.title}
                            </h1>
                        </Link>
                        <AvatarDate
                            avatar={`http://localhost:3300/photo/${post.author.username}?${new Date().getTime()}`}
                            author={post.author.username}
                            date={new Date(post.date).toDateString()}
                            colors="text-akpica-white"
                        />
                    </div>
                </div>
            ))}
            <button
                className="absolute top-1/2 left-0 md:m-5 transform -translate-y-1/2 bg-akpica-marco text-akpica-carlo px-2 py-4 opacity-0 group-hover:opacity-100 group-hover:z-50 transition-opacity duration-300"
                onClick={prevSlide}
            >
                <FaChevronLeft />
            </button>
            <button
                className="absolute top-1/2 right-0 md:m-5 transform -translate-y-1/2 bg-akpica-marco text-akpica-carlo px-2 py-4 opacity-0 group-hover:opacity-100 group-hover:z-50 transition-opacity duration-300"
                onClick={nextSlide}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Hero;
