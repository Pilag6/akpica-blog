// App.jsx
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import DHAdmin from "./pages/DHAdmin";
import Login from "./pages/Login";
import DashboardOutlet from "./pages/DH.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleTokenChange = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("token");
    };
  }, []);

  useEffect(() => {
    if (!token && window.location.pathname !== "/admin") {
      window.location.href = "/admin";
    }
  }, [token]);

  const ProtectedRoutes = () => {
    if (!token) {
      return <Navigate to="/admin/login" replace />;
    }

    return <DashboardOutlet />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />

        <Route path="/admin" element={<DHAdmin />} />

        <Route
          path="/admin/login"
          element={<Login onTokenChange={handleTokenChange} />}
        />

        <Route path="/dashboard/*" element={<ProtectedRoutes />} />
      </Routes>
    </>
  );
}

export default App;
