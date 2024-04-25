/* eslint-disable react/prop-types */
import AsideDashboard from "@components/DashboardStructure/AsideDashboard.jsx";
import NavbarDashboard from "@components/DashboardStructure/NavbarDashboard.jsx";

const DashboardLayout = ({ children }) => {
    return (
        <>
            <header className="fixed top-0 left-0 w-full h-20 bg-akpica-green py-4 px-5 flex items-center">
                <NavbarDashboard />
            </header>
            <aside className="fixed top-[80px] left-0 w-[300px] bg-akpica-carlo h-screen py-4 px-5 flex">
                <AsideDashboard />
            </aside>
            <main className="pl-[300px] mt-[5rem] w-full">{children}</main>
        </>
    );
};
export default DashboardLayout;
