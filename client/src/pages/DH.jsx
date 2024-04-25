import DashboardLayout from "@layouts/DashboardLayout.jsx";
import { Outlet } from "react-router-dom";

const DH = () => {
  return (
    <>
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
    </>
  );
};

export default DH;
