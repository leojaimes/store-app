import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './router/app-router';
import { AuthProvider } from './contexts/auth/auth-provider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
}

export default App;
