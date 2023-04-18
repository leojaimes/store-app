import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage } from '../auth/components/login-page/LoginPage';
import { Employee } from '../employee/Employee';
import { Admin } from '../admin/Admin';

const isAuth = false;
export function AppRouter() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          isAuth ? <Admin /> : <Navigate to="/" state={{ from: location }} />
        }
      />
      <Route
        path="/employee"
        element={
          isAuth ? <Employee /> : <Navigate to="/" state={{ from: location }} />
        }
      />

      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
