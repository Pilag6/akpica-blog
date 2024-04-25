import { NavLink } from "react-router-dom";
const AsideDashboard = () => {
    return (
        <div>
            <aside>
                Akpica Blog
                <NavLink to={"/dh-admin/dashboard/postsDashboard"}>Post</NavLink>
                <NavLink to={"/dh-admin/dashboard/usersDashboard"}>Users</NavLink>
            </aside>
        </div>
    );
};
export default AsideDashboard;
