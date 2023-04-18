import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage } from '../auth/components/login-page/LoginPage';
import { Employee } from '../employee/Employee';
import { Admin } from '../admin/Admin';
import { PrivateRoute } from './PrivateRoute';

interface AppRouterProps {
  isAuth?: boolean;
}

export function AppRouter({ isAuth = false }: AppRouterProps) {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute isAuth={isAuth}>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <PrivateRoute isAuth={isAuth}>
            <Employee />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
