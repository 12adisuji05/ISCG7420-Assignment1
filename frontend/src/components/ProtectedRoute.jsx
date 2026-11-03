import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Only lets logged-in users in. With "admin" it only lets staff in.
function ProtectedRoute({ children, admin }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <p className="text-muted">Loading...</p>;
    }
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (admin && !user.is_staff) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute;
