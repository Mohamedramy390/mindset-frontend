import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader/Loader';

/**
 * ProtectedRoute - Wrapper component for routes that require authentication
 * @param {Object} props
 * @param {React.Component} props.children - The component to render if authenticated
 * @param {string} props.requiredRole - Optional role requirement ('teacher' or 'student')
 * @param {string} props.redirectTo - Where to redirect if not authenticated (default: '/login')
 */
const ProtectedRoute = ({ children, requiredRole, redirectTo = '/login' }) => {
  const { user, loading } = useAuth();

  // Show loader while checking authentication
  if (loading) {
    return <Loader />;
  }

  // Not authenticated - redirect to login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on actual role
    const fallbackRoute = user.role === 'teacher' ? '/Dashboard' : '/rooms';
    return <Navigate to={fallbackRoute} replace />;
  }

  // Authenticated and authorized - render the protected component
  return children;
};

export default ProtectedRoute;
