import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  isAuth: boolean;
}
export function PrivateRoute({ children, isAuth }: PrivateRouteProps) {
  const location = useLocation();
  return isAuth ? children : <Navigate to="/" state={{ from: location }} />;
}
