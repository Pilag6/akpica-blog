import { useContext, useState } from "react";

// Components
import TitleSections from "@components/miniComponents/TitleSections.jsx";
import CardMoreFromUs from "../MoreFromUs/CardMoreFromUs.jsx";

// Icons
import { ImSpinner9 } from "react-icons/im";

// Backend URL
import BACKEND_URL from "@utils/backendUrl.js";

// Context
import { PostContext } from "@contexts/PostContext.jsx";

const FrontBackUxContainer = () => {
    const { posts } = useContext(PostContext);

    const [visiblePosts, setVisiblePosts] = useState(12);
    const [loading, setLoading] = useState(false);

    // Filter by tags: Frontend, Backend, UX/UI Design
    const frontendPosts = posts.filter((post) =>
        post.tags.includes("frontend")
    );
    const backendPosts = posts.filter((post) => post.tags.includes("backend"));
    const uxUiPosts = posts.filter((post) =>
        post.tags.includes("uxui design")
    );

    const loadMorePosts = () => {
        setLoading(true);
        setTimeout(() => {
            setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 6);
            setLoading(false);
        }, 1000); // Simulate loading delay
    };


    return (
        <section className="w-full my-11">
            <div className="flex flex-col justify-center gap-6">
                
                <div className="max-w-[1200px] mx-auto px-4 md:px-0">
                    <TitleSections titleSection={"Frontend"} />
                    <div className="flex flex-wrap gap-5 my-8">
                        {frontendPosts &&
                            frontendPosts
                                .slice(0, visiblePosts)
                                .map((article) => (
                                    <CardMoreFromUs
                                        key={article._id}
                                        img={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                                            article.title
                                        )}`}
                                        title={article.title}
                                        tag={article.tags[0]}
                                        avatar={`${BACKEND_URL}/photo/${
                                            article.author.username
                                        }`}
                                        author={article.author.username}
                                        date={new Date(
                                            article.date
                                        ).toDateString()}
                                        authorColors="text-akpica-black"
                                        bottom="mt-auto"
                                        link={`/${article.slug}`}
                                        linkTag={`/tags/${article.tags[0]}`}
                                    />
                                ))}
                    </div>
                    {visiblePosts < frontendPosts.length && (
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

                <div className="bg-akpica-pastel py-11">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-0">
                        <TitleSections titleSection={"Backend"} />
                        <div className="flex flex-wrap gap-5 my-8">
                            {backendPosts &&
                                backendPosts
                                    .slice(0, visiblePosts)
                                    .map((article) => (
                                        <CardMoreFromUs
                                            key={article._id}
                                            img={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                                                article.title
                                            )}`}
                                            title={article.title}
                                            tag={article.tags[0]}
                                            avatar={`${BACKEND_URL}/photo/${
                                                article.author.username
                                            }`}
                                            author={article.author.username}
                                            date={new Date(
                                                article.date
                                            ).toDateString()}
                                            authorColors="text-akpica-black"
                                            bottom="mt-auto"
                                            link={`/${article.slug}`}
                                            linkTag={`/tags/${article.tags[0]}`}
                                        />
                                    ))}
                        </div>
                        {visiblePosts < backendPosts.length && (
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

                <div>
                    <div className="max-w-[1200px] mx-auto px-4 md:px-0">
                        <TitleSections titleSection={"Ux/Ui design"} />
                        <div className="flex flex-wrap gap-5 my-8">
                            {uxUiPosts &&
                                uxUiPosts
                                    .slice(0, visiblePosts)
                                    .map((article) => (
                                        <CardMoreFromUs
                                            key={article._id}
                                            img={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                                                article.title
                                            )}`}
                                            title={article.title}
                                            tag={article.tags[0]}
                                            avatar={`${BACKEND_URL}/photo/${
                                                article.author.username
                                            }`}
                                            author={article.author.username}
                                            date={new Date(
                                                article.date
                                            ).toDateString()}
                                            authorColors="text-akpica-black"
                                            bottom="mt-auto"
                                            link={`/${article.slug}`}
                                            linkTag={`/tags/${article.tags[0]}`}
                                        />
                                    ))}
                        </div>
                        {visiblePosts < uxUiPosts.length && (
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
            </div>
        </section>
    );
};
export default FrontBackUxContainer;
