import { NavLink } from "react-router-dom";
import Axios from "axios";

// Icons
import { RiQuillPenFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { IoImages } from "react-icons/io5";
import { MdSettingsInputComponent } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { FaComments } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";

const linksStyles =
    "pl-4 text-akpica-white hover:underline-offset-8 hover:underline transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none flex items-center gap-2 text-lg font-semibold";

const AsideDashboard = () => {
    const handleLogout = () => {
        const logout = async () => {
            try {
                const res = await Axios.post("http://localhost:3300/logout", {
                    withCredentials: true
                });
                console.log("RES", res);

                // Clear the token cookie
                document.cookie =
                    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            } catch (error) {
                console.log(error);
            }
        };
        logout();
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
                    to={"/dh-admin/dashboard/usersDashboard"}
                >
                    <span>
                        <IoImages />
                    </span>
                    Media
                </NavLink>
                <NavLink
                    className={linksStyles}
                    to={"/dh-admin/dashboard/usersDashboard"}
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
                <hr className=" border-[1px] border-cyan-50/45" />
                <NavLink
                    className={linksStyles}
                    to={"/dh-admin/dashboard/usersDashboard"}
                >
                    <span>
                        <MdSettingsInputComponent />
                    </span>
                    Settings
                </NavLink>
                <NavLink
                    className={`mt-auto flex items-center justify-end gap-3 pb-5`}
                    to={"/dh-admin/"}
                    onClick={handleLogout}
                >
                    <div className="w-10 h-10">
                        <img
                            src={"https://avatar.iran.liara.run/public/1"}
                            alt=""
                        />
                    </div>
                    <b className="">Logout</b>
                    <span>
                        <IoMdLogOut className="text-2xl" />
                    </span>
                </NavLink>
                {/* {
                    user && (
                        <div className="flex flex-col items-center">
                            <img
                                className="w-10 h-10 rounded-full"
                                src={`http://localhost:3300/photo/${user.username}`}
                                alt=""
                            />
                        </div>
                    )
                } */}
            </div>
        </>
    );
};
export default AsideDashboard;
