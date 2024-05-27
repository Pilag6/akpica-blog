import Axios from 'axios';
import BACKEND_URL from '@utils/backendUrl.js';

const axiosInstance = Axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
