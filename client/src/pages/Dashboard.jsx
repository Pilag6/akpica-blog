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

            <section className="flex justify-between">
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
                            <th colSpan={2} className="px-6 py-3 text-center">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    
                    <tbody>
                    {posts ? (
                        posts.map((post, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            {/* <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        for="checkbox-table-1"
                                        className="sr-only"
                                    >
                                        checkbox
                                    </label>
                                </div>
                            </td> */}
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {post.title}
                            </th>
                            <td className="px-6 py-4">{post.author}</td>
                            <td className="px-6 py-4">{post.tags}</td>
                            <td className="px-6 py-4">{new Date(post.date).toDateString()}</td>
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
                        ))
                    ) : (
                        <h2>Loading...</h2>
                    )}
                        
                        
                    </tbody>
                </table>
            </div>

                <div>
                    {admin ? (
                        admin.map((user, index) => (
                            <div key={index}>
                                <h2>{user.username}</h2>
                            </div>
                        ))
                    ) : (
                        <h2>Loading...</h2>
                    )}
                </div>
            </section>

            
        </div>
    );
};
export default Dashboard;
