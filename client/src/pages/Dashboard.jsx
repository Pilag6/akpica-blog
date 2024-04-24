import Axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
    const [admin, setAdmin] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await Axios.get("http://localhost:3300/admin");
                setAdmin(res.data.user);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdmin();
    }, []);

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
            <h1>Dashboard</h1>

            <section className="flex justify-center gap-6">
                <div className="relative overflow-x-auto shadow-md">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {/* <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        for="checkbox-all"
                                        className="sr-only"
                                    >
                                        checkbox
                                    </label>
                                </div>
                            </th> */}
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
                                            {post.tags.slice(0, 4).map((tag, index) => (
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

                <div className="relative overflow-x-auto shadow-md ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email Address
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {admin &&
                                admin.map((user, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <th
                                            scope="row"
                                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src="/docs/images/people/profile-picture-1.jpg"
                                                alt="Jese image"
                                            />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">
                                                    {user.fullname}
                                                </div>
                                                <div className="font-normal text-gray-500">
                                                    {user.username}
                                                </div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Edit user
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
export default Dashboard;
