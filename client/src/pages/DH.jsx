import DashboardLayout from "@layouts/DashboardLayout.jsx";
import { Outlet } from "react-router-dom";

const DashboardOutlet = () => {
  return (
    <>
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
    </>
  );
};

export default DashboardOutlet;
