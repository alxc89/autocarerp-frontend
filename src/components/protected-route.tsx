import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface ProtectedRouteProps {
  requiredPermission?: string;
  requiredRole?: string;
  redirectTo?: string;
}

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 * Optionally checks for specific permissions or roles
 */
export const ProtectedRoute = ({
  requiredPermission,
  requiredRole,
  redirectTo = '/login',
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasPermission, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check permission if specified
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/" replace />;
  }

  // Check role if specified
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
