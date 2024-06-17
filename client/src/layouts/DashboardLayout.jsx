/* eslint-disable react/prop-types */
import { useContext } from "react";

import AsideDashboard from "@components/DashboardStructure/AsideDashboard.jsx";
import NavbarDashboard from "@components/DashboardStructure/NavbarDashboard.jsx";
import { ToggleContext } from "@contexts/ToggleContext.jsx";

const DashboardLayout = ({ children }) => {
    const { isOpen } = useContext(ToggleContext);

    return (
        <>
            <header className="fixed top-0 left-0 w-full h-20 bg-akpica-green py-4 pr-5 flex items-center z-10">
                <NavbarDashboard />
            </header>
            <aside className={`fixed top-[80px] left-0 transition-all ${isOpen ? "md:w-[200px] w-1/2" : "md:w-[80px] md:translate-x-0 -translate-x-24"} bg-akpica-carlo h-[calc(100vh-80px)] py-4 flex px-5 z-50`}>
                <AsideDashboard />
            </aside>
            <main className={`mt-[5rem] ${isOpen ? "md:pl-[200px]" : "md:pl-[80px] p-0"} w-full bg-black`}>{children}</main>
        </>
    );
};
export default DashboardLayout;
