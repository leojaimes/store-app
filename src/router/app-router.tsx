import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/components/login-page/LoginPage';
import { Employee } from '../employee/Employee';
import { Admin } from '../admin/Admin';
import { PrivateRoute } from './PrivateRoute';
import { Role } from '../const/roles';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <PrivateRoute>
            <Employee />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
