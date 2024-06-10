import { useState, useContext, useEffect } from "react";
import CardMoreFromUs from "./CardMoreFromUs.jsx";
import TitleSections from "@components/miniComponents/TitleSections.jsx";
import { ImSpinner9 } from "react-icons/im";
import { PostContext } from "@contexts/PostContext.jsx";
import BACKEND_URL from "@utils/backendUrl.js";

const MoreFromUsContainer = () => {
    let { posts } = useContext(PostContext);
    const [visiblePosts, setVisiblePosts] = useState(9);
    const [loading, setLoading] = useState(false);
    const [shuffledPosts, setShuffledPosts] = useState([]);

    useEffect(() => {
        if (posts.length) {
            // Sort posts by date (newest first)
            const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
            // Shuffle the sorted posts
            for (let i = sortedPosts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [sortedPosts[i], sortedPosts[j]] = [sortedPosts[j], sortedPosts[i]];
            }
            setShuffledPosts(sortedPosts);
        }
    }, [posts]);

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
                    {shuffledPosts && shuffledPosts.slice(0, visiblePosts).map((article) => (
                        <CardMoreFromUs
                            key={article._id}
                            img={`${BACKEND_URL}/posts/photo/${encodeURIComponent(article.title)}`}
                            title={article.title}
                            tag={article.tags[0]}
                            avatar={`${BACKEND_URL}/photo/${article.author.username}`}
                            author={article.author.username}
                            date={new Date(article.date).toDateString()}
                            authorColors="text-akpica-black"
                            bottom="mt-auto"
                            link={`/${article._id}`}
                            linkTag={`/tags/${article.tags[0]}`}
                        />
                    ))}
                </div>
                {visiblePosts < shuffledPosts.length && (
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
