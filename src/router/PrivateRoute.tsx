import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../utils/contexts/auth-context';

interface PrivateRouteProps {
  children: JSX.Element;
}
export function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();
  const { isUserAuth } = useContext(AuthContext);

  return isUserAuth ? children : <Navigate to="/" state={{ from: location }} />;
}
