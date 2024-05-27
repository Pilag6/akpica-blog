/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from 'react';
import axiosInstance from '@utils/axiosInstance';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        token: null,
    });

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const res = await axiosInstance.get('/auth/token');
                const token = document.cookie.split('; ').find(row => row.startsWith('token='))
                                ?.split('=')[1];

                if (token) {
                    setAuthState({
                        user: res.data.user,
                        token: token,
                    });
                } else {
                    console.error("No token found in cookies");
                }
            } catch (error) {
                console.error("Failed to fetch token:", error.response ? error.response.data : error.message);
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

export default AuthProvider;
