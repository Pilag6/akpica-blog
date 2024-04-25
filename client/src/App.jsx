import "./App.css";

// Routes
import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home.jsx";
import DHAdmin from "@pages/DHAdmin.jsx";
import Register from "@pages/Register.jsx";
import Login from "@pages/Login.jsx";
import Dashboard from "@pages/Dashboard.jsx";
import PostDashboard from "@components/PostDashboard.jsx";
import UserDashboard from "@components/UserDashboard.jsx";
import DashboardOutlet from "@pages/DH.jsx";


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
          <Route path="postsDashboard" element={<PostDashboard />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
