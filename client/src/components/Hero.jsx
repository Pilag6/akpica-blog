import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AvatarDate from "@components/miniComponents/AuthorDate.jsx";
import CardTag from "@components/miniComponents/CardTag.jsx";
import BACKEND_URL from "@utils/backendUrl";
import { PostContext } from "@contexts/PostContext.jsx";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Hero = () => {
    const { posts } = useContext(PostContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    const limitedPosts = sortedPosts.slice(0, 5);

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

    // Preload images
    useEffect(() => {
        limitedPosts.forEach((post) => {
            const img = new Image();
            img.src = `${BACKEND_URL}/posts/photo/${encodeURIComponent(post.title)}`;
        });
    }, [limitedPosts]);

    return (
        <div className="relative w-full h-[65vh] z-10 group">
            {limitedPosts.map((post, index) => (
                <div
                    key={post._id}
                    className={`absolute w-full h-full transition-opacity duration-[1000ms] ${
                        index === currentIndex ? "opacity-100 z-50" : "opacity-0"
                    }`}
                    style={{
                        backgroundImage: `url(${BACKEND_URL}/posts/photo/${encodeURIComponent(
                            post.title
                        )})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="flex flex-col justify-center h-full max-w-[1200px] mx-auto p-6 gap-2">
                        <CardTag
                            tag={post.tags[0]}
                            color="bg-akpica-marco text-akpica-black"
                            size="md:text-md text-sm"
                            link={`/tags/${post.tags}`}
                            linkTag={`/tags/${post.tags[0]}`}
                        />
                        <Link to={`/${post.slug}`} className="md:w-1/2 p-2">
                            <h1 className="w-fit decoration-clone md:text-5xl text-3xl bg-akpica-white px-5 md:leading-snug leading-snug inline uppercase font-[700] font-akpica-heading text-akpica-black">
                                {post.title}
                            </h1>
                        </Link>
                        <AvatarDate
                            avatar={`${BACKEND_URL}/photo/${post.author.username}`}
                            author={post.author.username}
                            date={new Date(post.date).toDateString()}
                            colors="text-akpica-white"
                            bgColor="bg-akpica-black/60 w-fit p-2"
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
