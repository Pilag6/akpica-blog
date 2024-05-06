/* eslint-disable react/prop-types */
import AsideDashboard from "@components/DashboardStructure/AsideDashboard.jsx";
import NavbarDashboard from "@components/DashboardStructure/NavbarDashboard.jsx";

const DashboardLayout = ({ children }) => {
    return (
        <>
            <header className="fixed top-0 left-0 w-full h-20 bg-akpica-green py-4 px-5 flex items-center z-10">
                <NavbarDashboard />
            </header>
            <aside className="fixed top-[80px] left-0 w-[200px] bg-akpica-carlo h-[calc(100vh-80px)] py-4 px-5 flex pb-2">
                <AsideDashboard />
            </aside>
            <main className="pl-[200px] mt-[5rem] w-full">{children}</main>
        </>
    );
};
export default DashboardLayout;
