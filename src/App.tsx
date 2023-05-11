import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { Form } from './form/form';
import { LoginPage } from './pages/login-page/LoginPage';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>
  );
}

export default App;
