import Axios from "axios";
import { useState, useEffect } from "react";

import DashboardLayout from "@layouts/DashboardLayout.jsx";

const PostDashboard = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await Axios.get("http://localhost:3300/posts");
                setPosts(res.data);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <DashboardLayout>
                <section className="flex justify-center gap-6">
                    <div className="relative overflow-x-auto shadow-md">
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
                                    <th
                                        colSpan={2}
                                        className="px-6 py-3 text-center"
                                    >
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
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {post.title}
                                            </th>
                                            <td className="px-6 py-4">
                                                {post.author}
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
                                                {new Date(
                                                    post.date
                                                ).toDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
            </DashboardLayout>
        </div>
    );
};
export default PostDashboard;
