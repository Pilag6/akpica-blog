/* eslint-disable react/prop-types */

import Logo from "@assets/logo-white.png";
import DashboardLayout from "@layouts/DashboardLayout.jsx";

const Dashboard = () => {
    return (
        <>
            <DashboardLayout>
                <div className="flex flex-col justify-center gap-8 w-full">
                    <h2 className="text-3xl">Dashboard</h2>
                    <img className="w-48" src={Logo} alt="" />
                </div>
            </DashboardLayout>
        </>
    );
};
export default Dashboard;
