/* eslint-disable react/prop-types */
import AsideDashboard from "@components/DashboardStructure/AsideDashboard.jsx";
import NavbarDashboard from "@components/DashboardStructure/NavbarDashboard.jsx";

const DashboardLayout = ({ children }) => {
    return (
        <>
            <header className="fixed top-0 left-0 w-full h-24 bg-yellow-300 ">
                <NavbarDashboard />
            </header>
            <section className="fixed top-0 left-0 w-[300px] bg-green-500 h-screen ">
                <AsideDashboard />
            </section>
            <main className="ml-[300px] mt-[6rem]">{children}</main>
        </>
    );
};
export default DashboardLayout;
