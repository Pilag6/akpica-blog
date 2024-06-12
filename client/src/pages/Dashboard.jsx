import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

// Backend URL
import BACKEND_URL from "@utils/backendUrl.js";
import { PostContext } from "@contexts/PostContext.jsx";

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
    const [location, setLocation] = useState({ city: "", country: "" });
    const [userRanking, setUserRanking] = useState([]);

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
            return { message: "Good morning", bgClass: "bg-akpica-pastel" };
        } else if (hour < 19) {
            return { message: "Good afternoon", bgClass: "bg-akpica-green" };
        } else {
            return {
                message: "Good evening",
                bgClass: "bg-gray-700 text-akpica-white border"
            };
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
                const res = await Axios.get("https://ipinfo.io");
                const { city, country } = res.data;
                setLocation({ city, country });
            } catch (error) {
                console.log(error);
            }
        };

        const calculateUserRanking = () => {
            const userPostCounts = {};

            posts.forEach((post) => {
                const userId = post.author._id;
                if (userPostCounts[userId]) {
                    userPostCounts[userId].postCount += 1;
                } else {
                    userPostCounts[userId] = {
                        postCount: 1,
                        username: post.author.username,
                        fullname: post.author.fullname,
                        id: post.author._id,
                        photo: `${BACKEND_URL}/photo/${post.author.username}`
                    };
                }
            });

            const ranking = Object.values(userPostCounts).sort(
                (a, b) => b.postCount - a.postCount
            );

            setUserRanking(ranking);
        };

        fetchUserData();
        fetchTotalUsers();
        fetchLocation();
        calculateUserRanking();

        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [posts]);

    const getUserPostCount = (userId) => {
        return posts.filter((post) => post.author._id === userId).length;
    };

    const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
    });
    const formattedTime = currentDate.toLocaleTimeString();

    const greeting = getGreeting();

    // Filter posts by logged-in user and sort by newest first
    const userPosts = posts
        .filter((post) => post.author._id === userId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="flex justify-start flex-col items-start gap-5 w-full md:h-[calc(100vh-80px)] md:p-8 p-3">
            <section className="flex gap-5 flex-wrap justify-between w-full ">
                <div className="flex flex-col gap-5 flex-wrap md:w-1/2">
                    {/* GREETING */}
                    <div className="flex md:flex-row flex-col gap-5 md:h-48">
                        <article
                            className={`flex w-full h-full  justify-between gap-5 ${greeting.bgClass} p-6 rounded-sm`}
                        >
                            <div className="flex flex-col">
                                <p className="text-2xl font-akpica-heading">
                                    {greeting.message},
                                </p>
                                <h2 className="font-[700] text-4xl font-akpica-heading">
                                    {fullName}
                                </h2>

                                <p className="leading-10 mt-auto">
                                    Post written by you:{" "}
                                    <span className="italic">
                                        <Link
                                            className="underline underline-offset-4 font-[700]"
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
                                    className="w-32 h-32 border-2 border-akpica-carlo rounded-full p-1 object-cover"
                                />
                            )}
                        </article>

                        {/* ADD NEW POST */}
                        <div className="md:w-96">
                            <Link
                                to={"/dh-admin/dashboard/postsDashboard/create"}
                                className="w-full h-full flex flex-col items-center justify-center gap-3 p-4 text-2xl font-[700] text-akpica-white border transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2 uppercase"
                            >
                                <FaPlus /> Write a Post
                            </Link>
                        </div>
                    </div>

                    {/* TOTAL POSTS, TAGS, USERS */}
                    <div className="flex md:flex-row flex-col gap-4 flex-wrap justify-between">
                        {/* TOTAL POSTS */}
                        <article className="aspect-square flex flex-col items-center gap-5 bg-gray-800 dark:hover:bg-gray-600 text-akpica-white  p-5 rounded-sm md:w-[190px]">
                            <div className="p-2 px-4 flex flex-col">
                                <IoNewspaperSharp className="text-akpica-white text-6xl" />
                                <h2 className="font-[700] text-2xl font-akpica-heading pt-4">
                                    Total Posts
                                </h2>
                                <Link
                                    to={"postsDashboard"}
                                    className="font-akpica-base italic text-3xl underline underline-offset-4 hover:text-akpica-marco"
                                >
                                    {postQuantity}
                                </Link>
                            </div>
                        </article>

                        {/* TOTAL TAGS */}
                        <article className="aspect-square flex flex-col items-center gap-5 bg-gray-800 dark:hover:bg-gray-600 text-akpica-white p-5 rounded-sm md:w-[190px]">
                            <div className="p-2 px-4 flex flex-col">
                                <FaHashtag className="text-akpica-white text-6xl" />
                                <h2 className="font-[700] text-2xl font-akpica-heading pt-4">
                                    Total Tags
                                </h2>
                                <Link
                                    to={"categoriesDashboard"}
                                    className="font-akpica-base italic text-3xl underline underline-offset-4 hover:text-akpica-marco"
                                >
                                    {uniqueTags.size}
                                </Link>
                            </div>
                        </article>

                        {/* TOTAL USERS */}
                        <article className="aspect-square flex flex-col items-center gap-5 bg-gray-800 dark:hover:bg-gray-600 text-akpica-white p-5 rounded-sm md:w-[190px]">
                            <div className="p-2 px-4 flex flex-col">
                                <FaRobot className="text-akpica-white text-6xl" />
                                <h2 className="font-[700] text-2xl font-akpica-heading pt-4">
                                    Total Users
                                </h2>
                                <Link
                                    to={"usersDashboard"}
                                    className="font-akpica-base italic text-3xl underline underline-offset-4 hover:text-akpica-marco"
                                >
                                    {totalUsers}
                                </Link>
                            </div>
                        </article>

                        {/* TOTAL USERS */}
                        <article className="aspect-square hidden md:flex flex-col items-center gap-5 border p-5 rounded-sm w-[190px]">
                            
                        </article>
                    </div>

                    {/* Posts written by the logged-in user */}
                    <article className="bg-gray-800 p-5 rounded-sm md:h-[42vh] md:overflow-y-scroll ">
                        <h2 className="font-[700] text-2xl font-akpica-heading mb-4 text-akpica-white">
                            Your Posts
                        </h2>
                        <div className="">
                            <table className="min-w-full overflow-y-scroll ">
                                <thead></thead>
                                <tbody>
                                    {userPosts.map((post) => (
                                        <tr key={post._id} className="border dark:border-gray-700 dark:hover:bg-gray-600">
                                            <td className="md:block hidden w-44">
                                                <img
                                                    src={`${BACKEND_URL}/posts/photo/${encodeURIComponent(post.title)}`}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </td>
                                            <td className="pl-2 md:py-4 py-1 whitespace-no-wrap md:border-r dark:border-gray-700">
                                                <Link
                                                    to={`/${post.slug}`}
                                                    className="text-akpica-white hover:text-akpica-marco hover:underline underline-offset-8 font-[700] text-sm md:text-base "
                                                >
                                                    {post.title.length > 55
                                                        ? `${post.title.substring(
                                                              0,
                                                              55
                                                          )}...`
                                                        : post.title}
                                                </Link>
                                            </td>

                                            <td className="pr-3 pl-4 py-4 whitespace-no-wrap">
                                                <p className="text-akpica-white font-[700] md:block hidden">
                                                    {new Date(post.date)
                                                        .toDateString()
                                                        .slice(4)}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </article>
                </div>

                <div className="flex-1 flex flex-col gap-5">
                    {/* DATE, TIME, LOCATION */}
                    <section className="hidden md:flex flex-col items-end gap-4 h-48">
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

                    {/* RECENT POSTS */}
                    <section className="flex flex-col gap-4">
                        <article className="bg-gray-800 p-5 rounded-sm">
                            <h2 className="font-[700] text-2xl font-akpica-heading text-akpica-white">
                                Recent Posts
                            </h2>
                            <ul className="flex flex-col gap-2 mt-4 pl-1">
                                {sortedPosts.slice(0, 6).map((post, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-akpica-white text-lg">
                                            {index + 1}.
                                        </span>
                                        <Link
                                            to={`/${post.slug}`}
                                            className="text-akpica-white hover:text-akpica-marco underline underline-offset-4 font-[700]"
                                        >
                                            {post.title.length > 35
                                                ? `${post.title.substring(
                                                      0,
                                                      35
                                                  )}...`
                                                : post.title}{" "}
                                            <span className="font-[500]">
                                                | by @{post.author.username} |{" "}
                                                {new Date(post.date)
                                                    .toDateString()
                                                    .slice(4)}{" "}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </section>

                    <div className="flex md:flex-row flex-col gap-5">
                        {/* Ranking with users with the most posts */}
                        <section className="bg-gray-800 p-5 rounded-sm md:w-1/2">
                            <h2 className="font-[700] text-2xl font-akpica-heading text-akpica-white">
                                User Ranking
                            </h2>
                            <ul className="flex flex-col gap-4 mt-4 pl-2">
                                {userRanking.slice(0, 3).map((user, index) => (
                                    <Link
                                        to={`/dh-admin/dashboard/usersDashboard/${user.id}`}
                                        key={index}
                                        className="flex items-center gap-4"
                                    >
                                        <span className="text-akpica-carlo text-lg bg-akpica-white p-2 w-6 h-6 flex justify-center items-center rounded-full">
                                            {index + 1}
                                        </span>
                                        <img
                                            src={user.photo}
                                            alt={user.fullname}
                                            className="w-16 h-16 object-cover rounded-full border-2 border-akpica-carlo"
                                        />
                                        <div className="text-akpica-white ">
                                            <p className="text-lg font-[700] hover:text-akpica-marco">
                                                {user.fullname} (@{user.username})
                                            </p>
                                            <p className="text-sm">
                                                {user.postCount} posts
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </ul>
                        </section>
                        {/* Ranking with users with the most posts */}
                        <section className="hidden md:block border p-5 rounded-sm md:w-1/2">
                            
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
