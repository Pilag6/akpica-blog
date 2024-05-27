import { useEffect} from 'react';
import axiosInstance from '@utils/axiosInstance';
import { AuthContext } from '@contexts/AuthContext.jsx';
import { useState } from 'react';

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
