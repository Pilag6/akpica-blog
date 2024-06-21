import { useContext, useState, useEffect } from "react";
import { PostContext } from "@contexts/PostContext.jsx";
import Axios from "axios";
import { FaPlus } from "react-icons/fa";
import { MdOutlineChevronRight, MdOutlineExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";
import BACKEND_URL from "@utils/backendUrl.js";
import NoteDashboard from "./NoteDashboard.jsx";
import useAuth from "@utils/useAuth.js";

const UserDashboard = () => {
    const [admin, setAdmin] = useState(null);
    const [userQuantity, setUserQuantity] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [sortCriteria, setSortCriteria] = useState({
        field: "name",
        order: "asc"
    });
    const [expandedRows, setExpandedRows] = useState({});
    const { posts } = useContext(PostContext);
    const { user: currentUser } = useAuth();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await Axios.get(`${BACKEND_URL}/admin`, {
                    withCredentials: true
                });
                setAdmin(res.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdmin();
    }, []);

    useEffect(() => {
        if (admin) {
            setUserQuantity(admin.length);
        } else {
            setUserQuantity(0);
        }
    }, [admin]);

    const confirmDeleteUser = (userId) => {
        setUserToDelete(userId);
        setShowModal(true);
    };

    const deleteUser = async () => {
        try {
            await Axios.delete(`${BACKEND_URL}/admin/delete/${userToDelete}`, {
                withCredentials: true
            });
            setAdmin(admin.filter((user) => user._id !== userToDelete));
            setShowModal(false);
            setUserToDelete(null);
        } catch (error) {
            console.log(error);
            setShowModal(false);
        }
    };

    const getUserPostCount = (userId) => {
        return posts.filter((post) => post.author._id === userId).length;
    };

    const handleSortChange = (field) => {
        setSortCriteria((prevCriteria) => ({
            field,
            order:
                prevCriteria.field === field && prevCriteria.order === "asc"
                    ? "desc"
                    : "asc"
        }));
    };

    const sortUsers = (users) => {
        return users.sort((a, b) => {
            if (sortCriteria.field === "name") {
                const nameA = a.fullname || "";
                const nameB = b.fullname || "";
                return sortCriteria.order === "asc"
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
            } else if (sortCriteria.field === "email") {
                const emailA = a.email || "";
                const emailB = b.email || "";
                return sortCriteria.order === "asc"
                    ? emailA.localeCompare(emailB)
                    : emailB.localeCompare(emailA);
            } else if (sortCriteria.field === "role") {
                const roleA = a.role || "";
                const roleB = b.role || "";
                return sortCriteria.order === "asc"
                    ? roleA.localeCompare(roleB)
                    : roleB.localeCompare(roleA);
            } else if (sortCriteria.field === "posts") {
                return sortCriteria.order === "asc"
                    ? getUserPostCount(a._id) - getUserPostCount(b._id)
                    : getUserPostCount(b._id) - getUserPostCount(a._id);
            }
            return 0;
        });
    };

    const sortedAdmin = admin ? sortUsers([...admin]) : [];

    const toggleRow = (index) => {
        setExpandedRows((prevExpandedRows) => ({
            ...prevExpandedRows,
            [index]: !prevExpandedRows[index]
        }));
    };

    return (
        <div className="md:h-[calc(100vh-80px)]">
            <div className={`flex items-center pt-6 pb-3 pl-8 gap-4 ${currentUser?.role === 'guest'  ? 'hidden' : ''}`}>
                <Link
                    to="/dh-admin/dashboard/register"
                    className={`w-fit flex items-center gap-3 p-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2 ${currentUser?.role === 'guest' ? 'pointer-events-none opacity-50' : ''}`}
                >
                    <FaPlus /> Add New User
                </Link>
            </div>
            <div className={`m-2 pl-8 text-akpica-white ${currentUser?.role === 'guest'  ? 'hidden' : ''}`}>
                ({userQuantity}) Users
            </div>
            <section className="flex flex-col md:flex-row gap-6 w-full p-4">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => handleSortChange("name")}
                                >
                                    User
                                    <MdOutlineChevronRight
                                        className={`ml-1 inline-block transform ${
                                            sortCriteria.field === "name" &&
                                            sortCriteria.order === "asc"
                                                ? "rotate-90"
                                                : "-rotate-90"
                                        }`}
                                    />
                                </th>
                                <th
                                    className="hidden md:table-cell px-6 py-3 cursor-pointer"
                                    onClick={() => handleSortChange("email")}
                                >
                                    Email Address
                                    <MdOutlineChevronRight
                                        className={`ml-1 inline-block transform ${
                                            sortCriteria.field === "email" &&
                                            sortCriteria.order === "asc"
                                                ? "rotate-90"
                                                : "-rotate-90"
                                        }`}
                                    />
                                </th>
                                <th
                                    className="hidden md:table-cell px-6 py-3 cursor-pointer"
                                    onClick={() => handleSortChange("role")}
                                >
                                    Role
                                    <MdOutlineChevronRight
                                        className={`ml-1 inline-block transform ${
                                            sortCriteria.field === "role" &&
                                            sortCriteria.order === "asc"
                                                ? "rotate-90"
                                                : "-rotate-90"
                                        }`}
                                    />
                                </th>
                                <th
                                    className="hidden md:table-cell px-6 py-3 cursor-pointer"
                                    onClick={() => handleSortChange("posts")}
                                >
                                    Posts
                                    <MdOutlineChevronRight
                                        className={`ml-1 inline-block transform ${
                                            sortCriteria.field === "posts" &&
                                            sortCriteria.order === "asc"
                                                ? "rotate-90"
                                                : "-rotate-90"
                                        }`}
                                    />
                                </th>
                                <th
                                    className="hidden md:table-cell  px-6 py-3"
                                    colSpan={2}
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAdmin.map((user, index) => (
                                <tr
                                    key={index}
                                    className={`border-b bg-gray-800 dark:border-gray-700 hover:bg-gray-600 ${currentUser?.role === 'guest' && currentUser?._id !== user._id ? 'hidden' : ''}`}
                                >
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 whitespace-nowrap text-white"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full object-cover object-center"
                                            src={`${BACKEND_URL}/photo/${
                                                user.username
                                            }?${new Date().getTime()}`}
                                            alt=""
                                        />
                                        <div className="ps-3">
                                            <Link to={`/dh-admin/dashboard/usersDashboard/${user._id}`} className="text-base font-semibold">
                                                {user.fullname}
                                            </Link>
                                            <div className="font-normal text-gray-500">
                                                @{user.username}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleRow(index)}
                                            className="md:hidden text-2xl text-akpica-marco hover:text-akpica-white focus:outline-none transition-all ml-auto"
                                        >
                                            {expandedRows[index] ? (
                                                <MdOutlineExpandMore />
                                            ) : (
                                                <MdOutlineChevronRight />
                                            )}
                                        </button>
                                    </th>
                                    {expandedRows[index] && (
                                        <>
                                            <div className="flex items-center">
                                                <td className="md:hidden block px-6 py-2">
                                                    EMAIL:{" "}
                                                    {user.email.toLowerCase()}
                                                </td>
                                                <td className="md:hidden block py-2">
                                                    ROLE:{" "}
                                                    {user.role
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        user.role.slice(1)}
                                                </td>
                                            </div>
                                            <div className="flex gap-5 items-center pb-4 justify-between">
                                                <td className="md:hidden block px-6 pr-8 py-2">
                                                    POSTS:{" "}
                                                    <Link
                                                        className="underline-offset-4 underline"
                                                        to={`/dh-admin/dashboard/postsDashboard?authorId=${user._id}`}
                                                    >
                                                        {getUserPostCount(
                                                            user._id
                                                        )}
                                                    </Link>
                                                </td>

                                                <div className="flex items-center pr-4">
                                                    <td className="md:hidden block px-2 py-2">
                                                        <Link
                                                            to={`/dh-admin/dashboard/usersDashboard/${user._id}`}
                                                            className={`font-medium text-akpica-marco hover:underline hover:underline-offset-4 ${currentUser?.role === 'guest' && currentUser?._id !== user._id ? 'pointer-events-none opacity-50' : ''}`}
                                                        >
                                                            Edit user
                                                        </Link>
                                                    </td>
                                                    <td className="md:hidden block px-2 py-2">
                                                        <button
                                                            onClick={() =>
                                                                confirmDeleteUser(
                                                                    user._id
                                                                )
                                                            }
                                                            className={`font-medium text-akpica-tomato hover:underline ${currentUser?.role === 'guest' && currentUser?._id !== user._id ? 'pointer-events-none opacity-50' : ''}`}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </div>
                                            </div>
                                            
                                        </>
                                    )}
                                    <td className="hidden md:table-cell px-6 py-4">
                                        {user.email.toLowerCase()}
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4">
                                        {user.role.charAt(0).toUpperCase() +
                                            user.role.slice(1)}
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4 text-center">
                                        <Link
                                            className="underline-offset-4 underline"
                                            to={`/dh-admin/dashboard/postsDashboard?authorId=${user._id}`}
                                        >
                                            {getUserPostCount(user._id)}
                                        </Link>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4">
                                        <Link
                                            to={`/dh-admin/dashboard/usersDashboard/${user._id}`}
                                            className={`font-medium text-akpica-marco hover:underline hover:underline-offset-4 ${currentUser?.role === 'guest' && currentUser?._id !== user._id ? 'pointer-events-none opacity-50' : ''}`}
                                        >
                                            Edit user
                                        </Link>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4">
                                        <button
                                            onClick={() =>
                                                confirmDeleteUser(user._id)
                                            }
                                            className={`font-medium text-akpica-tomato hover:underline ${currentUser?.role === 'guest'  ? 'hidden' : ''}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col flex-1 bg-gray-800">
                    <NoteDashboard />
                </div>
            </section>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            Confirm Deletion
                        </h2>
                        <p>Are you sure you want to delete this user?</p>
                        <p className="text-xs mt-2 text-red-600">
                            This action is irreversible.
                        </p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteUser}
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

export default UserDashboard;
