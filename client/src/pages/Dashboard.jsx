import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

// Backend URL
import BACKEND_URL from "@utils/backendUrl.js";
import { PostContext } from "@contexts/PostContext.jsx";

import Logo from "@assets/logo-white.png";

// Icons
import { IoNewspaperSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
    const { posts, postQuantity } = useContext(PostContext);

    const [profilePicture, setProfilePicture] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [userId, setUserId] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [location, setLocation] = useState({ city: '', country: '' });

    // Extract unique tags from posts and count their occurrences
    const uniqueTags = new Set();
    posts.forEach((post) => {
        post.tags.forEach((tag) => uniqueTags.add(tag));
    });

    // Sort posts by newest first
    const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "Good morning";
        } else if (hour < 19) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await Axios.get(`${BACKEND_URL}/me`, {
                    withCredentials: true
                });
                const user = res.data.user;
                setProfilePicture(`${BACKEND_URL}/photo/${user.username}`);
                setFullName(user.fullname);
                setUserId(user._id);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchTotalUsers = async () => {
            try {
                const res = await Axios.get(`${BACKEND_URL}/admin`, {
                    withCredentials: true
                });
                setTotalUsers(res.data.user.length);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchLocation = async () => {
            try {
                const res = await Axios.get('https://ipinfo.io');
                const { city, country } = res.data;
                setLocation({ city, country });
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
        fetchTotalUsers();
        fetchLocation();

        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const getUserPostCount = (userId) => {
        return posts.filter((post) => post.author._id === userId).length;
    };

    const formattedDate = currentDate.toDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    return (
        <div className="flex justify-start items-start gap-6 w-full h-[calc(100vh-80px)] p-8">
            <div className="flex flex-col gap-6">
                <section className="flex gap-6">
                    <article className="flex items-center gap-5 bg-akpica-green w-fit p-5 rounded-sm">
                        <div>
                            <p className="text-2xl font-akpica-heading">
                                {getGreeting()},
                            </p>
                            <h2 className="font-[700] text-4xl font-akpica-heading">
                                {fullName}
                            </h2>

                            <p className="leading-8">
                                Post written by you:{" "}
                                <span className="italic">
                                    <Link
                                        className="underline underline-offset-4 font-[700] text-akpica-carlo"
                                        to={`/dh-admin/dashboard/postsDashboard?authorId=${userId}`}
                                    >
                                        {getUserPostCount(userId)}
                                    </Link>{" "}
                                </span>
                            </p>
                        </div>
                        {profilePicture && (
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-28 h-28 border-2 border-akpica-carlo rounded-full p-1 object-cover"
                            />
                        )}
                    </article>

                    <article className="flex flex-col items-center gap-5 bg-akpica-green w-fit p-5 rounded-sm">
                        <div className="aspect-square p-2 px-4 flex flex-col">
                            <IoNewspaperSharp className="text-akpica-carlo text-6xl" />
                            <h2 className="font-[700] text-2xl font-akpica-heading pt-4">
                                Total Posts
                            </h2>
                            <Link
                                to={"postsDashboard"}
                                className="font-akpica-base italic text-3xl underline underline-offset-4 hover:text-akpica-carlo/70"
                            >
                                {postQuantity}
                            </Link>
                        </div>
                    </article>

                    <article className="flex flex-col items-center gap-5 bg-akpica-green w-fit p-5 rounded-sm">
                        <div className="aspect-square p-2 px-4 flex flex-col">
                            <FaHashtag className="text-akpica-carlo text-6xl" />
                            <h2 className="font-[700] text-2xl font-akpica-heading pt-4">
                                Total Tags
                            </h2>
                            <Link
                                to={"categoriesDashboard"}
                                className="font-akpica-base italic text-3xl underline underline-offset-4 hover:text-akpica-carlo/70"
                            >
                                {uniqueTags.size}
                            </Link>
                        </div>
                    </article>

                    <article className="flex flex-col items-center gap-5 bg-akpica-green w-fit p-5 rounded-sm">
                        <div className="aspect-square p-2 px-4 flex flex-col">
                            <FaRobot className="text-akpica-carlo text-6xl" />
                            <h2 className="font-[700] text-2xl font-akpica-heading pt-4">
                                Total Users
                            </h2>
                            <Link
                                to={"usersDashboard"}
                                className="font-akpica-base italic text-3xl underline underline-offset-4 hover:text-akpica-carlo/70"
                            >
                                {totalUsers}
                            </Link>
                        </div>
                    </article>
                </section>
            </div>

            <section className="flex flex-col gap-4 flex-1 h-[calc(100vh-120px)]">
                <section className="flex flex-col gap-4">
                    <article className="bg-akpica-green p-5 rounded-sm">
                        <h2 className="font-[700] text-2xl font-akpica-heading">
                            Recent Posts
                        </h2>
                        <ul className="flex flex-col gap-2 mt-4 pl-1">
                            {sortedPosts.slice(0, 5).map((post, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-akpica-carlo text-lg">
                                        {index + 1}.
                                    </span>
                                    <Link
                                        to={`/${post._id}`}
                                        className="text-akpica-carlo hover:text-akpica-carlo/70 underline underline-offset-4 font-[700]"
                                    >
                                        {post.title.length > 35
                                            ? `${post.title.substring(
                                                  0,
                                                  35
                                              )}...`
                                            : post.title}{" "}
                                        <span className="font-[500]">
                                            | by @{post.author.username} |{" "}
                                            {new Date(post.date).toDateString()}{" "}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </article>
                </section>

                <div className="flex items-center pb-3 pl-1">
                    <Link
                        to={"/dh-admin/dashboard/postsDashboard/create"}
                        className=" w-full flex items-center justify-center gap-3 p-4 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2 uppercase"
                    >
                        <FaPlus /> Add New Post
                    </Link>
                </div>

                <section className="mt-auto flex flex-col items-end mb-3 gap-4">
                    <div className="flex flex-col gap-1 pl-1">
                        <p className="text-akpica-white text-2xl  font-akpica-heading text-right w-48">
                            {formattedDate}
                        </p>
                        <p className="text-akpica-white text-5xl font-[700] font-akpica-heading tracking-wider w-48 text-right leading-9">
                            {formattedTime}
                        </p>
                        {/* City, Country */}
                        <p className="text-akpica-white text-2xl font-akpica-heading text-right w-48">
                            {location.city}, {location.country}
                        </p>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Dashboard;
