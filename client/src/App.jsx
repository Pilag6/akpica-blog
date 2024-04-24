import "./App.css";

// Routes
import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home.jsx";
import DHAdmin from "@pages/DHAdmin.jsx";
import Register from "@pages/Register.jsx";
import Login from "@pages/Login.jsx";
import Dashboard from "@pages/Dashboard.jsx";

function App() {
    return (
        <>
            <Routes>
                {/* No Portected Paths */}
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h1>Not Found</h1>} />

                {/* Protected Paths */}
                <Route path="/dh-admin" element={<DHAdmin />} />
                <Route path="/dh-admin/register" element={<Register />} />
                <Route path="/dh-admin/login" element={<Login />} />
                <Route path="/dh-admin/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
