import { Link } from "react-router-dom";
import Logo from "@assets/logo-white.png";
import { useContext } from "react";
import { PostContext } from "@contexts/PostContext.jsx";

const Home = () => {
    const { posts } = useContext(PostContext);

    return (
        <>
            <div className="flex flex-col justify-center items-center  bg-akpica-carlo">
                <img className="w-72" src={Logo} alt="" />
                <div className="mb-12 -mt-10 text-2xl font-semibold">
                    Website Under Construction
                </div>
                <Link
                    className="py-4 px-8 text-2xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                    to="/dh-admin"
                >
                    Go to Dashboard
                </Link>
            </div>

            {posts &&
                posts.map((post) => (
                    <div
                        key={post._id}
                        className="flex flex-col justify-center items-center bg-akpica-carlo border-2 mt-8"
                    >
                        <div className="text-2xl font-semibold">
                            {post.title}
                        </div>
                        <div>{post.author}</div>
                        <div className="text-xl">{post.content}</div>
                    </div>
                ))}
        </>
    );
};

export default Home;
