// App.jsx
import "./App.css";
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
import PostDetails from "@pages/PostDetails.jsx";
import TagPage from "@pages/TagPage.jsx";
import MediaDashboard from "@components/DashboardStructure/MediaDashboard.jsx";
import CreatePosts from "@components/DashboardStructure/CreatePosts.jsx";

import AboutUs from "@pages/AboutUs";



import EditPost from "@components/DashboardStructure/EditPost.jsx";
import { AuthProvider } from '../src/contexts/AuthContext.jsx';
import ProtectedRoute from '../src/components/DashboardStructure/ProtectedRoute.jsx';


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* No Protected Paths */}
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PostDetails />} />

        <Route path="/about" element={<AboutUs/>} />


        <Route path="/tags/:tags" element={<TagPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/dh-admin" element={<DHAdmin />} />
        <Route path="/dh-admin/login" element={<Login />} />

        {/* Protected Paths */}
        <Route path="/dh-admin/dashboard" element={
          <ProtectedRoute>
            <DashboardOutlet />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="usersDashboard" element={<UserDashboard />} />
          <Route path="usersDashboard/:id" element={<UserProfile />} />
          <Route path="postsDashboard" element={<PostDashboard />} />
          <Route path="postsDashboard/:id" element={<PostInfo />} />
          <Route path="postsDashboard/create" element={<CreatePosts />} />
          <Route path="postsDashboard/edit/:id" element={<EditPost />} />
          <Route path="mediaDashboard" element={<MediaDashboard />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
