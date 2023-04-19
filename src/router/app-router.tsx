import React, { useState, createContext, useContext } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  BrowserRouter as Router,
} from 'react-router-dom';
import { LoginPage } from '../auth/components/login-page/LoginPage';
import { Employee } from '../employee/Employee';
import { Admin } from '../admin/Admin';
import { PrivateRoute } from './PrivateRoute';
import { AuthContext } from '../utils/contexts/auth-context';

export function AppRouter() {
  const { isUserAuth } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
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

      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
