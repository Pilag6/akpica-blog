/* eslint-disable react/prop-types */
import { useContext } from "react";

import AsideDashboard from "@components/DashboardStructure/AsideDashboard.jsx";
import NavbarDashboard from "@components/DashboardStructure/NavbarDashboard.jsx";
import { ToggleContext } from "@contexts/ToggleContext.jsx";

const DashboardLayout = ({ children }) => {
    const {isOpen, handleOpen} = useContext(ToggleContext);

    return (
        <>
            <header className="fixed top-0 left-0 w-full h-20 bg-akpica-green py-4 pr-5 flex items-center z-10">
                <NavbarDashboard />
            </header>
            <aside className={`fixed top-[80px] left-0 ${isOpen ? "w-[200px]" : "w-[80px]"} bg-akpica-carlo h-[calc(100vh-80px)] py-4 flex px-5`}>
                <AsideDashboard />
            </aside>
            <main className={`mt-[5rem] ${isOpen ? "pl-[200px]" : "pl-[80px]"} w-full`}>{children}</main>
        </>
    );
};
export default DashboardLayout;
