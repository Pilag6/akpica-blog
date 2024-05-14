import { PostContext } from "@contexts/PostContext.jsx";
import { useContext } from "react";

// Icons

import { FaPlus } from "react-icons/fa";

const PostDashboard = () => {

    const { posts, quantity } = useContext(PostContext);

    return (
        <div>
            <div className="flex items-center pt-6 pb-3 pl-8 gap-4">
                <button className="w-fit flex items-center gap-3 p-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2">
                    <FaPlus /> Add New Post
                </button>
            </div>
            <div className="pl-8">({quantity}) Posts</div>
            <section className="flex justify-center gap-6 w-full p-4">
                <div className="relative overflow-x-auto shadow-md w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
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
                                <th colSpan={2} className="px-6 py-3 ">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {posts &&
                                posts.map((post, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-akpica-white"
                                        >
                                            {post.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {post.author.username}
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
                                            <a
                                                href="#"
                                                className="font-medium text-akpica-marco dark:text-akpica-marco hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href="#"
                                                className="font-medium text-akpica-tomato dark:text-akpica-tomato hover:underline"
                                            >
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};
export default PostDashboard;
