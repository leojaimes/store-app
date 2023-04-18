import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage } from '../auth/components/login-page/LoginPage';
import { Employee } from '../employee/Employee';
import { Admin } from '../admin/Admin';
import { PrivateRoute } from './PrivateRoute';

interface AppRouterProps {
  isAuth?: boolean;
}

export function AppRouter({ isAuth = false }: AppRouterProps) {
  const [isUserAuth, setIsUserAuth] = useState<boolean>(isAuth);
  const handleSuccessLogin = () => setIsUserAuth(true);
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage onSuccessLogin={handleSuccessLogin} />}
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute isAuth={isUserAuth}>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <PrivateRoute isAuth={isUserAuth}>
            <Employee />
          </PrivateRoute>
        }
      />

      <Route
        path="*"
        element={<LoginPage onSuccessLogin={handleSuccessLogin} />}
      />
    </Routes>
  );
}
