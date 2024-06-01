import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Cloudinary } from "cloudinary-core";

import CardTag from "@components/miniComponents/CardTag.jsx";
import AvatarDate from "@components/miniComponents/AuthorDate.jsx";
import { PostContext } from "@contexts/PostContext.jsx";
import BACKEND_URL from "@utils/backendUrl.js";
import {CLOUDINARY_CLOUD_NAME} from "@utils/cloudinary.js";

const cl = new Cloudinary({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    secure: true
});

const Hero = () => {
    const { posts } = useContext(PostContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Sort posts by date (newest first) and limit to last 5 posts
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

    return (
        <div className="relative w-full h-[65vh] z-10 group">
            {limitedPosts && limitedPosts.map((post, index) => (
                <div
                    key={post._id}
                    className={`absolute w-full h-full transition-all duration-[3000ms] ${
                        index === currentIndex ? "opacity-100 z-50" : "opacity-0"
                    }`}
                    style={{
                        // backgroundImage: `url(${cl.url(post.image, { width: 1920, crop: "fill" })}) ?? url(${BACKEND_URL}/posts/photo/${encodeURIComponent(post.title)}?${new Date().getTime()})`,

                        backgroundImage: `url(${cl.url(post.image, { width: 1920, crop: "fill" })})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className="flex flex-col justify-center h-full max-w-[1200px] mx-auto p-6 gap-2">
                        <CardTag
                            tag={post.tags[0]}
                            color="bg-akpica-marco text-akpica-white"
                            size="text-md"
                            link={`/tags/${post.tags}`}
                            linkTag={`/tags/${post.tags[0]}`}
                        />
                        <Link to={`${post._id}`} className="md:w-1/2 p-2">
                            <h1 className="w-fit decoration-clone text-5xl bg-akpica-white px-5 leading-snug inline uppercase font-[700] font-akpica-heading text-akpica-black">
                                {post.title}
                            </h1>
                        </Link>
                        <AvatarDate
                            avatar={`${BACKEND_URL}/photo/${post.author.username}?${new Date().getTime()}`}
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
