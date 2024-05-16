import "./App.css";

// Routes
import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home.jsx";
import DHAdmin from "@pages/DHAdmin.jsx";
import Register from "@pages/Register.jsx";
import Login from "@pages/Login.jsx";
import Dashboard from "@pages/Dashboard.jsx";
import PostDashboard from "@components/DashboardStructure/PostDashboard.jsx";
import UserDashboard from "@components/DashboardStructure/UserDashboard.jsx";
import DashboardOutlet from "@pages/DH.jsx";
import UserProfile from "@components/DashboardStructure/UserProfile.jsx";
import PostInfo from "@components/DashboardStructure/PostInfo.jsx";


function App() {
  return (
    <>
      <Routes>
        {/* No Portected Paths */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />

        <Route path="/dh-admin" element={<DHAdmin />} />

        <Route path="/dh-admin/login" element={<Login />} />

        {/* Protected Paths */}
        <Route path="/dh-admin/dashboard" element={<DashboardOutlet />}>
          <Route index element={<Dashboard />} />
          <Route path="usersDashboard" element={<UserDashboard />} />
          <Route path="usersDashboard/:id" element={<UserProfile />} />
          <Route path="postsDashboard" element={<PostDashboard />} />
          <Route path="postsDashboard/:id" element={<PostInfo />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
