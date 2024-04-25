/* eslint-disable react/prop-types */

import Logo from "@assets/logo-white.png";
import DashboardLayout from "@layouts/DashboardLayout.jsx";

const Dashboard = () => {
    return (
        <>
            <DashboardLayout>
                <div>Dashboard</div>
                <img src={Logo} alt="" />
            </DashboardLayout>
        </>
    );
};
export default Dashboard;
