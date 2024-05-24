import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Axios from "axios";

// Icons
import { RiQuillPenFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { IoImages } from "react-icons/io5";
import { MdSettingsInputComponent } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { FaComments } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";

// Backend URL
import BACKEND_URL from "@utils/backendUrl.js";

const linksStyles =
    "pl-4 text-akpica-white hover:underline-offset-8 hover:underline transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none flex items-center gap-2 text-lg font-semibold";

const AsideDashboard = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await Axios.get(`${BACKEND_URL}/me`, {
                    withCredentials: true,
                });
                const user = res.data.user;
                setProfilePicture(`${BACKEND_URL}/photo/${user.username}`);
                setUsername(user.username);
                setRole(user.role);
                setUserId(user._id);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await Axios.post(`${BACKEND_URL}/logout`, {}, {
                withCredentials: true,
            });

            // Clear the token cookie
            document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
            // Redirect to login page
            navigate("/dh-admin/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <NavLink
                    className="flex items-center gap-2 text-akpica-marco hover:text-opacity-90 font-semibold border-b-2 border-cyan-50/45 pb-4 text-xl"
                    to={"/dh-admin/dashboard"}
                >
                    <span>
                        <RiDashboardFill />
                    </span>
                    Dashboard
                </NavLink>
                <NavLink
                    className={linksStyles}
                    to={"/dh-admin/dashboard/postsDashboard"}
                >
                    <span>
                        <RiQuillPenFill />
                    </span>
                    Post
                </NavLink>
                <NavLink
                    className={linksStyles}
                    to={"/dh-admin/dashboard/mediaDashboard"}
                >
                    <span>
                        <IoImages />
                    </span>
                    Media
                </NavLink>
                <NavLink
                    className={linksStyles}
                    to={"/dh-admin/dashboard/commentsDashboard"}
                >
                    <span>
                        <FaComments />
                    </span>
                    Comments
                </NavLink>
                <NavLink
                    className={`${linksStyles}`}
                    to={"/dh-admin/dashboard/usersDashboard"}
                >
                    <span>
                        <FaUserFriends />
                    </span>
                    Users
                </NavLink>
                <hr className="border-[1px] border-cyan-50/45" />
                <NavLink
                    className={linksStyles}
                    to={"/dh-admin/dashboard/settingsDashboard"}
                >
                    <span>
                        <MdSettingsInputComponent />
                    </span>
                    Settings
                </NavLink>
                <div className="mt-auto pb-6 flex items-center justify-center gap-3">
                    <Link to={`/dh-admin/dashboard/usersDashboard/${userId}`} className="flex gap-3 items-center">
                        <div className="w-12 h-12 border-1 flex items-center">
                            <img
                                src={profilePicture || "/favicon.png"}
                                alt="Profile"
                                className="border-2 border-cyan-50/45 rounded-full p-1 object-cover"
                            />
                        </div>
                        <div className="text-akpica-white">
                            <p className="uppercase font-bold">{username}</p>
                            <p className="text-xs">{role}</p>
                        </div>
                    </Link>
                    <button
                        title="Log Out"
                        onClick={handleLogout}
                        className="flex items-center justify-center"
                    >
                        <IoMdLogOut className="text-2xl text-akpica-white" />
                    </button>
                </div>
            </div>
        </>
    );
};
export default AsideDashboard;
