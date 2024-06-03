/* eslint-disable react/prop-types */
// ProtectedRoute.js

import { Navigate } from 'react-router-dom';
import  useAuth  from '@utils/useAuth.js';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;  // Show a loading indicator while checking auth
    }

    if (!user) {
        return <Navigate to="/dh-admin/login" />;
    }

    return children;
};

export default ProtectedRoute;
