// PostDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";
import CardTag from "@components/miniComponents/CardTag.jsx";
import Header from "@components/Header/Header.jsx";
import { PostContext } from "@contexts/PostContext.jsx";
import CardMoreFromUs from "@components/banners/MoreFromUs/CardMoreFromUs.jsx";

//BACKEND URL
import BACKEND_URL from "@utils/backendUrl.js";

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const { posts } = useContext(PostContext);

    useEffect(() => {
        const fetchPost = async () => {
            try {



                const response = await Axios.get(`${BACKEND_URL}/posts/${id}`);

                setPost(response.data);
                console.log("Fetched post:", response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="min-h-screen">
            <Header darkBackground={true} />

            <header
                className="h-[60vh]"
                style={{
                    backgroundImage: `url(http://localhost:3300/posts/photo/${encodeURIComponent(
                        post.title
                    )}?${new Date().getTime()})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            ></header>

            <main className="bg-akpica-white max-w-[1200px] mx-auto z-30 -mt-40 min-h-96 pl-16 pr-9 py-12 flex flex-col relative">
                <div className="flex flex-col w-3/4 gap-5 mb-12">
                    <CardTag
                        tag={post.tags}
                        size={"text-sm"}
                        color={"bg-akpica-green text-akpica-white"}
                    />
                    <h1 className="text-5xl pr-12 bg-akpica-white font-[700] font-akpica-heading text-akpica-black">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-5">
                        <AuthorDate
                            avatar={`http://localhost:3300/photo/${
                                post.author.username
                            }?${new Date().getTime()}`}
                            author={post.author.fullname}
                            date={new Date(post.date).toDateString()}
                            colors="text-akpica-black"
                        />
                    </div>
                </div>

                <div className="flex">
                    <div
                        className="w-2/3 h-auto pr-12 border-r-4 border-akpica-green"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <aside className="flex-1 pl-4 sticky top-24 h-[calc(100vh-32px)] overflow-auto">
                        <h2 className="font-bold font-akpica-heading text-2xl mb-4">
                            RECENT POSTS
                        </h2>
                        <div className="flex flex-col gap-8 w-4/12">
                            {posts &&
                                posts
                                    .slice(0, 4)
                                    .map((article) => (
                                        <CardMoreFromUs
                                            key={article._id}
                                            img={`http://localhost:3300/posts/photo/${encodeURIComponent(
                                                article.title
                                            )}?${new Date().getTime()}`}
                                            title={article.title}
                                            tag={article.tags}
                                            avatar={`http://localhost:3300/photo/${
                                                article.author.username
                                            }?${new Date().getTime()}`}
                                            author={article.author.username}
                                            date={new Date(
                                                article.date
                                            ).toDateString()}
                                            authorColors="text-akpica-black"
                                            bottom="mt-auto"
                                        />
                                    ))}
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default PostDetails;