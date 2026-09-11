import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from './AuthProvider.jsx';
import { LoadingScreen } from '../components/LoadingScreen.jsx';

export function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <LoadingScreen message="Checking session..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ returnTo: location.pathname }} />;
    }

    return <Outlet />;
}
