import { NavLink } from "react-router-dom";

const DHAdmin = () => {
    return (
        <div>
            <NavLink to="/dh-admin/register">Register</NavLink><br />
            <NavLink to="/dh-admin/login">Login</NavLink>
        </div>
    );
};
export default DHAdmin;
