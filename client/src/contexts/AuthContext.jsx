import { useEffect} from 'react';
import axiosInstance from '@utils/axiosInstance';
import { useState } from 'react';
import { createContext } from 'react';

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
                setAuthState({
                    user: res.data.user,
                    token: document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1],
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

export default AuthProvider;
