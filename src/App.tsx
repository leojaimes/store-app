import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { LoginPage } from './auth/components/login-page/LoginPage';
import { Employee } from './employee/Employee';
import { Admin } from './admin/Admin';

function App() {
  // return <LoginPage />;

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
