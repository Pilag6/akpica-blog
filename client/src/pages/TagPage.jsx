import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import BACKEND_URL from "@utils/backendUrl.js";
import Header from "@components/Header/Header.jsx";
import technology from "@assets/hero.avif";
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";


// Utility function to strip HTML tags
const stripHtmlTags = (str) => {
    return str.replace(/<[^>]*>?/gm, "");
};

const TagPage = () => {
    const { tags } = useParams();
    const [postsTags, setPostsTags] = useState([]);

    

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

    return (
        <div className="min-h-screen">
            <Header darkBackground={true} />

            <header
                className="h-[40vh] flex items-center justify-center text-akpica-white text-4xl font-bold uppercase"
                style={{
                    backgroundImage: `url(${technology})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <span className="bg-akpica-marco p-4">{tags}</span>
            </header>

            <div className="w-full flex items-center px-4 mt-5">
                <div className="w-[1200px] mx-auto flex flex-wrap gap-6 flex-col">
                    <h1 className="text-3xl font-bold text-akpica-white font-akpica-heading">
                        Posts tagged with{" "}
                        <span className="uppercase">{tags}</span>
                    </h1>
                    <div className="flex flex-wrap md:gap-5 gap-1 gap-y-5">
                        {postsTags &&
                            postsTags.map((post) => (
                                <div
                                    key={post._id}
                                    className="w-full md:w-[280px]  bg-white shadow-md"
                                >
                                    <img
                                        src={`${BACKEND_URL}/posts/photo/${post.title}`}
                                        alt={post.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold">
                                            {post.title}
                                        </h2>
                                        <p className="my-4">
                                            {stripHtmlTags(
                                                post.content
                                            ).substring(0, 100)}
                                            ...
                                        </p>
                                        <AuthorDate
                                            author={post.author.username}
                                            avatar={`${BACKEND_URL}/photo/${
                                                post.author.username
                                            }?${new Date().getTime()}`}
                                            date={new Date(
                                                post.date
                                            ).toDateString()}
                                        />

                                        <div className="mt-8">
                                            <Link
                                                to={`/${post._id}`}
                                                className="bg-akpica-green hover:bg-akpica-carlo transition-all duration-300 text-white px-4 py-2"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagPage;
