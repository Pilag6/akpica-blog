import { useState } from "react";
import CardMoreFromUs from "./CardMoreFromUs.jsx";

import TitleSections from "@components/miniComponents/TitleSections.jsx";
import { ImSpinner9 } from "react-icons/im";

import { useContext } from "react";
import { PostContext } from "@contexts/PostContext.jsx";
//backend URL
import BACKEND_URL from "@utils/backendUrl.js";


const MoreFromUsContainer = () => {
    let { posts } = useContext(PostContext);
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [loading, setLoading] = useState(false);

    const loadMorePosts = () => {
        setLoading(true);
        setTimeout(() => {
            setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 6);
            setLoading(false);
        }, 1000); // Simulate loading delay
    };

    return (
        <div className="w-full my-11 px-4">
            <div className="max-w-[1200px] mx-auto flex flex-col justify-center gap-6">
                <TitleSections titleSection="MORE FROM US" />
                <div className="flex flex-wrap gap-5">
                    {posts && posts.slice(0, visiblePosts).map((article) => (
                        <CardMoreFromUs
                            key={article._id}
                            img={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                                article.title
                            )}?${new Date().getTime()}`}
                            title={article.title}
                            tag={article.tags}
                            avatar={`${BACKEND_URL}/photo/${
                            article.author.username
                        }?${new Date().getTime()}`}
                            author={article.author.username}
                            date={new Date(article.date).toDateString()}
                            authorColors="text-akpica-black"
                            bottom="mt-auto"
                            link={`/${article._id}`}
                            linkTag={`/tags/${article.tags}`}
                            />
                    ))}
                </div>
                {visiblePosts < posts.length && (
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
    );
};

export default MoreFromUsContainer;
