/* eslint-disable react/prop-types */
// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import BACKEND_URL from '@utils/backendUrl.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        token: null,
    });

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const res = await Axios.get(`${BACKEND_URL}/auth/token`, {
                    withCredentials: true,
                });
                setAuthState({
                    user: res.data.user,
                    token: res.data.token,
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchToken();
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};
