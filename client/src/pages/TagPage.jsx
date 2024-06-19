import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import BACKEND_URL from "@utils/backendUrl.js";
import Header from "@components/Header/Header.jsx";
import technology from "@assets/hero.avif";
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";
import Footer from "@components/Footer.jsx";
import NotFound from "./NotFound";

import { ImSpinner9 } from "react-icons/im";

// Utility function to strip HTML tags
const stripHtmlTags = (str) => {
    return str.replace(/<[^>]*>?/gm, "");
};

const TagPage = () => {
    const { tags } = useParams();
    const [postsTags, setPostsTags] = useState(null);
    const [visiblePosts, setVisiblePosts] = useState(8);
    const [loading, setLoading] = useState(false);

    const loadMorePosts = () => {
        setLoading(true);
        setTimeout(() => {
            setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 8);
            setLoading(false);
        }, 1000); // Simulate loading delay
    };

    useEffect(() => {
        const fetchPostsByTag = async () => {
            try {
                const response = await Axios.get(
                    `${BACKEND_URL}/posts/tags/${tags}`
                );
                setPostsTags(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPostsByTag();
    }, [tags]);

    if (!postsTags || postsTags.length === 0) {
      return (
        <div>
          <NotFound />
        </div>
      );
    }

    return (
        <div className="min-h-screen">
            <Header darkBackground={true} />

            <header
                className="h-[40vh] flex items-center justify-center text-akpica-black text-4xl font-bold uppercase"
                style={{
                    backgroundImage: `url(${technology})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <span className="bg-akpica-marco p-4">{tags}</span>
            </header>

            <div className="w-full flex items-center p-10 bg-black/10">
                <div className="w-[1200px] mx-auto flex flex-wrap gap-6 flex-col">
                    <h1 className="text-3xl font-bold text-akpica-white font-akpica-heading">
                        Posts tagged with{" "}
                        <span className="uppercase">{tags}</span>
                    </h1>
                    <div className="flex flex-wrap md:gap-5 gap-1 gap-y-5">
                        {postsTags.slice(0, visiblePosts).map((post) => (
                            <div
                                key={post._id}
                                className="w-full md:w-[280px] bg-white shadow-md flex flex-col gap-1"
                            >
                                <img
                                    src={`${BACKEND_URL}/posts/photo/${encodeURIComponent(post.title)}`}
                                    alt={post.title}
                                    className="w-full h-40 object-cover"
                                />

                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">
                                        {post.title}
                                    </h2>
                                    <p className="my-3">
                                        {stripHtmlTags(post.content).substring(
                                            0,
                                            100
                                        )}
                                        ...
                                    </p>
                                </div>

                                <div className="mt-auto flex flex-col gap-3">
                                    <div className="pr-2 pl-4">
                                        <AuthorDate
                                            author={post.author.username}
                                            avatar={`${BACKEND_URL}/photo/${
                                                post.author.username
                                            }`}
                                            date={new Date(
                                                post.date
                                            ).toDateString()}
                                            authorLink={`/author/${post.author.username}`}
                                        />
                                    </div>
                                    <Link
                                        to={`/${post.slug}`}
                                        className="bg-akpica-green hover:bg-akpica-carlo transition-all duration-300 text-white p-4 font-[700] text-center font-akpica-heading text-xl"
                                    >
                                        READ MORE
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {visiblePosts < postsTags.length && (
                        <button
                            onClick={loadMorePosts}
                            className="mt-4 px-4 py-2 w-56 h-16 bg-akpica-green text-white font-[600] mx-auto flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <ImSpinner9 className="animate-spin h-5 w-5" />
                            ) : (
                                "LOAD MORE"
                            )}
                        </button>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TagPage;
