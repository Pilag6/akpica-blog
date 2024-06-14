// Router
import { Route, Routes } from "react-router-dom";

// Components
import CreatePosts from "@components/DashboardStructure/CreatePosts.jsx";
import EditPost from "@components/DashboardStructure/EditPost.jsx";
import MediaDashboard from "@components/DashboardStructure/MediaDashboard.jsx";
import PostDashboard from "@components/DashboardStructure/PostDashboard.jsx";
import PostInfo from "@components/DashboardStructure/PostInfo.jsx";
import UserDashboard from "@components/DashboardStructure/UserDashboard.jsx";
import UserProfile from "@components/DashboardStructure/UserProfile.jsx";

// Pages
import AboutUs from "@pages/AboutUs";
import Dashboard from "@pages/Dashboard.jsx";
import DashboardOutlet from "@pages/DH.jsx";
import DHAdmin from "@pages/DHAdmin.jsx";
import Home from "@pages/Home.jsx";
import Login from "@pages/Login.jsx";
import PostDetails from "@pages/PostDetails.jsx";
import Register from "@pages/Register.jsx";
import TagPage from "@pages/TagPage.jsx";
import AuthorPage from "@pages/AuthorPage.jsx";

// Contexts Provider & Protected Route
import { AuthProvider } from '@contexts/AuthContext.jsx';
import ProtectedRoute from '@components/DashboardStructure/ProtectedRoute.jsx';

// Smooth Scroll Up
import SmoothScroll from "@utils/SmootScroll.jsx";
import CategoriesDasboard from "@components/DashboardStructure/CategoriesDasboard.jsx";


function App() {
  return (
    <SmoothScroll>
      <AuthProvider>
        <Routes>
          {/* No Protected Paths */}
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<PostDetails />} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/tags/:tags" element={<TagPage />} />
          <Route path="/author/:author" element={<AuthorPage />} />
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
            <Route path="categoriesDashboard" element={<CategoriesDasboard />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </AuthProvider>
    </SmoothScroll>
  );
}

export default App;
