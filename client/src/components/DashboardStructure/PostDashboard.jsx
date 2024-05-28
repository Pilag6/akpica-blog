import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

// Post Context
import { PostContext } from "@contexts/PostContext.jsx";

// Icons
import { FaPlus } from "react-icons/fa";

// Backend URL
import BACKEND_URL from "@utils/backendUrl.js";

const PostDashboard = () => {
    const { posts, postQuantity, setPosts } = useContext(PostContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const authorId = queryParams.get("authorId");

    const filteredPosts = authorId
        ? posts.filter((post) => post.author._id === authorId)
        : posts;

    const currentAuthor = authorId
        ? posts.find((post) => post.author._id === authorId)?.author.username
        : null;

    const handleShowAllPosts = () => {
        queryParams.delete("authorId");
        navigate({ search: queryParams.toString() });
    };

    const handleFilterByAuthor = (authorId) => {
        queryParams.set("authorId", authorId);
        navigate({ search: queryParams.toString() });
    };

    const confirmDeletePost = (postId) => {
        setPostToDelete(postId);
        setShowModal(true);
    };

    const deletePost = async () => {
        try {
            await Axios.delete(`${BACKEND_URL}/posts/${postToDelete}`, {
                withCredentials: true,
            });
            setPosts(posts.filter((post) => post._id !== postToDelete));
            setShowModal(false);
            setPostToDelete(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex items-center pt-6 pb-3 pl-8">
                <button
                    onClick={() => navigate("create")}
                    className="w-fit flex items-center gap-3 p-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                >
                    <FaPlus /> Add New Post
                </button>
            </div>
            <div className="flex">
                <div
                    className="pl-8 text-akpica-white cursor-pointer underline underline-offset-4"
                    onClick={handleShowAllPosts}
                >
                    All Posts ({postQuantity})
                </div>
                {currentAuthor && (
                    <div className="pl-4 text-akpica-white">
                        {currentAuthor} ({filteredPosts.length})
                    </div>
                )}
            </div>

            <section className="flex justify-center gap-6 w-full p-4">
                <div className="relative overflow-x-auto shadow-md w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Post Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Author
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tags
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th colSpan={2} className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPosts.map((post, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6">
                                        <img
                                            src={`${BACKEND_URL}/posts/photo/${post.title}?${new Date().getTime()}`}
                                            alt="post image"
                                            className="w-10 h-10 object-cover"
                                        />
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-akpica-white"
                                    >
                                        <Link to={`http://localhost:5173/${post._id}`}>{post.title}</Link>
                                    </td>
                                    <td
                                        className="px-6 py-4 cursor-pointer"
                                        onClick={() => handleFilterByAuthor(post.author._id)}
                                    >
                                        @{post.author.username}
                                    </td>
                                    <td className="px-6 py-4 flex gap-3">
                                        {post.tags
                                            .slice(0, 4)
                                            .map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gray-200 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(post.date).toDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/posts/edit/${post._id}`}
                                            className="font-medium text-akpica-marco dark:text-akpica-marco hover:underline"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => confirmDeletePost(post._id)}
                                            className="font-medium text-akpica-tomato dark:text-akpica-tomato hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this post?</p>
                        <p className="text-xs mt-2 text-red-600">This action is irreversible.</p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deletePost}
                                className="px-4 py-2 bg-akpica-tomato text-white hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDashboard;
