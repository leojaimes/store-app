import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/auth-context';
import { getRoutePermissionsByRole } from '../const/roles';

interface PrivateRouteProps {
  children: JSX.Element;
}
export function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();
  const { isUserAuth, user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }

  const permission = getRoutePermissionsByRole(user.role);

  if (permission.permittedRoutes.includes(location.pathname)) {
    return isUserAuth ? (
      children
    ) : (
      <Navigate to="/" state={{ from: location }} />
    );
  }

  return (
    <Navigate
      to={permission.whenNotPermitedRedirectTo}
      state={{ from: location }}
    />
  );
}
