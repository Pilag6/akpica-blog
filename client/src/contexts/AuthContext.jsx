/* eslint-disable react/prop-types */
// AuthContext.js
import { createContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
import BACKEND_URL from "@utils/backendUrl.js";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // Add a loading state
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const response = await Axios.get(`${BACKEND_URL}/me`, { withCredentials: true });
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);  // Set loading to false after the check
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await Axios.post(`${BACKEND_URL}/login`, { username, password }, { withCredentials: true });
            setUser(response.data.user);
            navigate('/dh-admin/dashboard');
        } catch (error) {
            throw new Error('Invalid username or password');
        }
    };

    const logout = async () => {
        await Axios.post(`${BACKEND_URL}/logout`, {}, { withCredentials: true });
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
