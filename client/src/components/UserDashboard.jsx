import Axios from "axios";
import { useState, useEffect } from "react";

// Icons

import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const [admin, setAdmin] = useState(null);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await Axios.get("http://localhost:3300/admin", {
                    withCredentials: true
                });
                setAdmin(res.data.user);
                // console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdmin();
    }, []);

    // Set quantity of posts

    useEffect(() => {
        if (admin) {
            setQuantity(admin.length);
        } else {
            setQuantity(0);
        }
    }, [admin]);

    return (
        <div>
            <div className="flex items-center pt-6 pb-3 pl-8 gap-4">
                <Link
                    to="/dh-admin/dashboard/register"
                    className="w-fit flex items-center gap-3 p-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                >
                    <FaPlus /> Add New User
                </Link>
            </div>
            <div className="pl-8">({quantity}) Users</div>
            <section className="flex gap-6 w-full p-4">
                <div className="relative overflow-x-auto shadow-md">
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
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Post
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
                                                className="w-10 h-10 rounded-full object-cover object-center"
                                                // Change the src to the custom avatar

                                                src={`http://localhost:3300/photo/${
                                                    user.username
                                                }?${new Date().getTime()}`}
                                                alt=""
                                            />

                                            <div className="ps-3">
                                                <div className="text-base font-semibold">
                                                    {user.fullname}
                                                </div>
                                                <div className="font-normal text-gray-500">
                                                    @{user.username}
                                                </div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.email.toLowerCase()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* COnvert user rolo with the first letter Capitalize */}
                                            {user.role.charAt(0).toUpperCase() +
                                                user.role.slice(1)}
                                        </td>

                                        <td className="px-6 py-4 cursor-pointer underline underline-offset-4 text-akpica-green hover:text-akpica-pastel text-center">
                                            <Link>{Math.floor(Math.random() * 100)}</Link>
                                        </td>

                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/dh-admin/dashboard/usersDashboard/${user._id}`}
                                                className="font-medium text-akpica-marco dark:text-akpica-marco hover:underline hover:underline-offset-4"
                                            >
                                                Edit user
                                            </Link>
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
export default UserDashboard;
