import { NavLink } from "react-router-dom";

const linksStyles = "pl-4 text-akpica-white hover:underline-offset-8 hover:underline transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
const AsideDashboard = () => {
    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <NavLink className="text-akpica-marco hover:text-opacity-90 font-semibold border-b-2 border-cyan-50/45 pb-4" to={"/dh-admin/dashboard"}>Dashboard</NavLink>
                <NavLink className={linksStyles} to={"/dh-admin/dashboard/postsDashboard"}>Post</NavLink>
                <NavLink className={linksStyles} to={"/dh-admin/dashboard/usersDashboard"}>Users</NavLink>
            </div>
        </>
    );
};
export default AsideDashboard;
