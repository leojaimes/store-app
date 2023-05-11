import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

import { CssBaseline } from '@mui/material';
import { LoginPage } from './pages/login-page/LoginPage';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <LoginPage />
    </QueryClientProvider>
  );
}

export default App;
