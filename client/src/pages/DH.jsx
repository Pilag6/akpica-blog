import DashboardLayout from "@layouts/DashboardLayout.jsx";
import { Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserDashboard from "../components/UserDashboard";
import PostDashboard from "../components/PostDashboard";
import Register from "./Register";

const DashboardOutlet = () => {
    return (
        <>
            <DashboardLayout>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="usersDashboard" element={<UserDashboard />} />
                    <Route path="postsDashboard" element={<PostDashboard />} />
                    <Route path="register" element={<Register />} />
                </Routes>
                <Outlet />
            </DashboardLayout>
        </>
    );
};

export default DashboardOutlet;
